# create-release

GitHub Action for creating releases on GitHub. This action is a wrapper around the [Create a release](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#create-a-release) endpoint in the [GitHub REST API](https://docs.github.com/en/rest).

## Inputs

- `token` - The GitHub token to use for authentication. When not specified, GITHUB_TOKEN env variable is used
- `tag-name` - The name of the tag to create
- `target-commitish` - The commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch (usually **main**)
- `name` - The name of the release
- `body` - Text describing the contents of the tag
- `draft` - **true** to create a draft (unpublished) release, **false** to create a published one. Default: **false**
- `prerelease` - **true** to identify the release as a prerelease. **false** to identify the release as a full release. Default: **false**
- `discussion-category-name` - The name of the discussion category to associate with this release
- `generate-release-notes` - **true** to generate release notes for the release. **false** to skip the generation of release notes. Default: **false**
- `make-latest` - **true** to update the repository's default branch with the newly created tag. **false** to skip updating the default branch. Default: **false**

## Outputs

- `id` - The ID of the release
- `node-id` - The Node ID of the release
- `url` - The URL of the release
- `html-url` - The HTML URL of the release
- `assets-url` - The URL of the release assets
- `upload-url` - The URL to upload release assets to
- `tarball-url` - The URL of the release tarball
- `zipball-url` - The URL of the release zipball
- `tag-name` - The name of the tag that was created
- `target-commitish` - The commitish value that determines where the Git tag is created from
- `name` - The name of the release
- `body` - Text describing the contents of the tag
- `draft` - **true** if the release is a draft (unpublished) release, **false** if the release is published
- `prerelease` - **true** if the release is identified as a prerelease release, **false** if the release is identified as a full release
- `created-at` - The date and time the release was created
- `published-at` - The date and time the release was published at

## Example

```yml
name: Create release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    name: Create release
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Create Release
        id: create_release
        uses: dae-ne/create-release@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          tag-name: ${{ github.ref_name }}
          name: Release ${{ github.ref_name }}
      - run: echo ${{ steps.create_release.outputs.id }}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
