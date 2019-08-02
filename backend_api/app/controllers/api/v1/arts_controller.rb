class Api::V1::ArtsController < ApplicationController
    # ?per_page=5&page=1
    def index
        arts = paginate Art.all
        render json: Api::V1::ArtSerializer.new(arts)
    end
    def create
        Art.create(art_params)
    end

    private

    def art_params
        params.require(:art).permit(:title, :img_url)
    end

end
