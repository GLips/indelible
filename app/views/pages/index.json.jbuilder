json.array!(@pages) do |page|
  json.extract! page, :content, :user_id
  json.url page_url(page, format: :json)
end
