// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

use std::path::{Path, PathBuf};

use cargo_metadata::{Metadata, MetadataCommand};
use tauri::utils::acl::{self, Error};

pub struct Builder<'a> {
  commands: &'a [&'static str],
  global_scope_schema: Option<schemars::schema::RootSchema>,
}

impl<'a> Builder<'a> {
  pub fn new(commands: &'a [&'static str]) -> Self {
    Self {
      commands,
      global_scope_schema: None,
    }
  }

  /// Sets the global scope JSON schema.
  pub fn global_scope_schema(mut self, schema: schemars::schema::RootSchema) -> Self {
    self.global_scope_schema.replace(schema);
    self
  }

  /// [`Self::try_build`] but will exit automatically if an error is found.
  pub fn build(self) {
    if let Err(error) = self.try_build() {
      println!("{}: {}", env!("CARGO_PKG_NAME"), error);
      std::process::exit(1);
    }
  }

  /// Ensure this crate is properly configured to be a Tauri plugin.
  ///
  /// # Errors
  ///
  /// Errors will occur if environmental variables expected to be set inside of [build scripts]
  /// are not found, or if the crate violates Tauri plugin conventions.
  pub fn try_build(self) -> Result<(), Error> {
    // convention: plugin names should not use underscores
    let name = build_var("CARGO_PKG_NAME")?;
    if name.contains('_') {
      return Err(Error::CrateName);
    }

    let out_dir = PathBuf::from(build_var("OUT_DIR")?);

    // requirement: links MUST be set and MUST match the name
    let _links = build_var("CARGO_MANIFEST_LINKS")?;

    let autogenerated = Path::new("permissions/autogenerated");
    let commands_dir = &autogenerated.join("commands");

    std::fs::create_dir_all(&autogenerated).expect("unable to create permissions dir");

    if !self.commands.is_empty() {
      acl::build::autogenerate_command_permissions(commands_dir, self.commands, "");
    }

    let permissions = acl::build::define_permissions("./permissions/**/*.*", &name, &out_dir)?;

    acl::build::generate_schema(&permissions, "./permissions")?;
    generate_docs(&permissions, &autogenerated)?;

    if let Some(global_scope_schema) = self.global_scope_schema {
      acl::build::define_global_scope_schema(global_scope_schema, &name, &out_dir)?;
    }

    let metadata = find_metadata()?;
    println!("{metadata:#?}");

    Ok(())
  }
}

fn generate_docs(permissions: &[acl::plugin::PermissionFile], out_dir: &Path) -> Result<(), Error> {
  let mut docs = format!("# Permissions\n\n");

  fn docs_from(id: &str, description: Option<&str>) -> String {
    let mut docs = format!("## {id}");
    if let Some(d) = description {
      docs.push_str(&format!("\n\n{d}"));
    }
    docs
  }

  for permission in permissions {
    for set in &permission.set {
      docs.push_str(&docs_from(&set.identifier, Some(&set.description)));
      docs.push_str("\n\n");
    }

    if let Some(default) = &permission.default {
      docs.push_str(&docs_from("default", default.description.as_deref()));
      docs.push_str("\n\n");
    }

    for permission in &permission.permission {
      docs.push_str(&docs_from(
        &permission.identifier,
        permission.description.as_deref(),
      ));
      docs.push_str("\n\n");
    }
  }

  std::fs::write(out_dir.join("reference.md"), docs).map_err(Error::WriteFile)?;

  Ok(())
}

/// Grab an env var that is expected to be set inside of build scripts.
fn build_var(key: &'static str) -> Result<String, Error> {
  std::env::var(key).map_err(|_| Error::BuildVar(key))
}

fn find_metadata() -> Result<Metadata, Error> {
  build_var("CARGO_MANIFEST_DIR").and_then(|dir| {
    MetadataCommand::new()
      .current_dir(dir)
      .no_deps()
      .exec()
      .map_err(Error::Metadata)
  })
}