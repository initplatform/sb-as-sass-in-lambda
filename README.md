# As-Sass-in

## GCloud Functions

<https://cloud.google.com/functions/docs/quickstart>

```bash
gcloud functions list

npm run build

gcloud functions deploy compileSass \
    --runtime nodejs12 \
    --memory 128MB \
    --trigger-http \
    --allow-unauthenticated

```

### View GCloud logs

<https://cloud.google.com/functions/docs/monitoring/logging#viewing_runtime_logs>

```bash
gcloud functions logs read
```

## Run locally

<https://github.com/GoogleCloudPlatform/functions-framework-nodejs>

```bash
nr local
```
