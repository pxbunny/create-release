# create-release

```yml
jobs:
  build:
    name: Create Release
    permissions: write-all
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Create Release
        id: create_release
        uses: dae-ne/create-release@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag-name: v1.0.0
          name: Release ${{ github.ref_name }}
      - run: echo ${{ steps.create_release.outputs.id }}
```
