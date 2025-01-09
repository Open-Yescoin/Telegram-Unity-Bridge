if [ -z "$1" ]; then
  echo "Please provide a commit message"
  exit 1
fi

pnpm new-version &&\
  pnpm packages-version &&\
  git add . &&\
  git commit -m $1 &&\
  pnpm changeset-publish &&\
  git push &&\
  git push --tag
