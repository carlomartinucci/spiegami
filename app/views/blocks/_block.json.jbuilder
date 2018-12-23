json.extract! block, :id, :title, :body, :origin, :created_at, :updated_at
json.url block_url(block, format: :json)
