#!/usr/bin/env bash
set -e

if [ -n "${POSTGRES_NON_ROOT_USER:-}" ] && [ -n "${POSTGRES_NON_ROOT_PASSWORD:-}" ]; then
  echo "[init-data] Creating non-root user '${POSTGRES_NON_ROOT_USER}'"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    DO \$\$
    BEGIN
      IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${POSTGRES_NON_ROOT_USER}') THEN
        CREATE USER ${POSTGRES_NON_ROOT_USER} WITH PASSWORD '${POSTGRES_NON_ROOT_PASSWORD}';
      END IF;
    END
    \$\$;
    GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DB} TO ${POSTGRES_NON_ROOT_USER};
    GRANT CREATE ON SCHEMA public TO ${POSTGRES_NON_ROOT_USER};
EOSQL
else
  echo "[init-data] SETUP INFO: POSTGRES_NON_ROOT_USER/PASSWORD not provided; skipping."
fi
