import config from "../../portfolio.config.json";

export const portfolioConfig = config;
export const isSampleMode = config.contentMode === "sample";
export const siteUrl = `https://${config.githubUsername}.github.io/${config.repositoryName}/`;
export const githubUrl = `https://github.com/${config.githubUsername}`;
