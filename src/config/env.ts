import * as v from 'valibot';

const EnvSchema = v.object({
  SITE_URL: v.string(),
  GITHUB_GRAPHQL_URL: v.string(),
});

const createEnv = (): v.InferOutput<typeof EnvSchema> => {
  const envVars = {
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    GITHUB_GRAPHQL_URL: process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_URL,
  };

  return v.parse(EnvSchema, envVars);
};

export const env = createEnv();
