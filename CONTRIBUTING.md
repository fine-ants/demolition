# Contributing to @fineants/demolition

Thanks for contributing!
Please take a look at the below procedures for feasible contribution.

## Prerequisite

**Create a new issue describing the objective before proceeding.**

## Setup

```
git clone https://github.com/fine-ants/demolition.git

cd demolition

git switch dev

# Ex: feat/#1-useText-hook
git switch -c "<type>/<issue number>-<issue title>"
```

## Developing

Create a folder for the corresponding feature and test files.

### Example

```
.
|- packages
    |- hooks
        |- useText
            |- useText.tsx
            |- useText.test.ts
```

## Test

```
# Test all packages
npm run test
```

## Making a Pull Request

```
# Ex: git push --set-upstream feat/#1-useText-hook
git push --set-upstream "<type>/<issue number>-<issue title>"
```

Open a PR to merge the corresponding branch to `dev` on GitHub.

## Repository Branching

```
main - the most recent release and current docs
dev - code under active development between stable releases
```
