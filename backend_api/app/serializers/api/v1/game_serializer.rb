class Api::V1::GameSerializer
  include FastJsonapi::ObjectSerializer
  attributes :result, :score, :user_id
end
