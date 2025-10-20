const core = require("@actions/core");
const exec = require("@actions/exec");

async function run() {
  try {
    if (
      core.getInput("browserstack-upload").toLowerCase() === "true" &&
      (!core.getInput("browserstack-username") || !core.getInput("browserstack-access-key"))
    ) {
      throw new Error("Browserstack username or access key missing.");
    }
    process.env.PROJECT_PATH = core.getInput("project-path");
    process.env.TEAM_ID = core.getInput("team-id");
    process.env.TEAM_NAME = core.getInput("team-name");
    process.env.WORKSPACE_PATH = core.getInput("workspace-path");
    process.env.EXPORT_METHOD = core.getInput("export-method");
    process.env.CONFIGURATION = core.getInput("configuration");
    process.env.OUTPUT_PATH = core.getInput("output-path");
    process.env.SCHEME = core.getInput("scheme");
    process.env.FASTLANE_VERSION = core.getInput("fastlane-version");
    process.env.FASTLANE_ENV = core.getInput("fastlane-env");
    process.env.IOS_APP_ID = core.getInput("ios-app-id");
    await exec.exec(`bash ${__dirname}/../build.sh`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
