-- name: InsertDeploymentID :exec
INSERT INTO site_configs (key, value) VALUES ('deployment_id', $1);

-- name: GetDeploymentID :one
SELECT value FROM site_configs WHERE key = 'deployment_id';

-- name: InsertDERPMeshKey :exec
INSERT INTO site_configs (key, value) VALUES ('derp_mesh_key', $1);

-- name: GetDERPMeshKey :one
SELECT value FROM site_configs WHERE key = 'derp_mesh_key';

-- name: InsertOrUpdateLastUpdateCheck :exec
INSERT INTO site_configs (key, value) VALUES ('last_update_check', $1)
ON CONFLICT (key) DO UPDATE SET value = $1 WHERE site_configs.key = 'last_update_check';

-- name: GetLastUpdateCheck :one
SELECT value FROM site_configs WHERE key = 'last_update_check';
