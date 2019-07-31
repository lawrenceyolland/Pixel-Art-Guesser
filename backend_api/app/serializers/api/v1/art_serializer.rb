class Api::V1::ArtSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :img_url
end
