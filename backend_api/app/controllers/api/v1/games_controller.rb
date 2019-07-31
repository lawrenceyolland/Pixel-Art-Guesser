class Api::V1::GamesController < ApplicationController
  before_action :set_game, only: [:destroy, :show, :update]
    def index
      games = Game.all
      options = {
        include: [:user]
      }
      render json: Api::V1::GameSerializer.new(games, options)
    end
    def create
        Game.create(game_params)
    end

    private

    def set_game
      @game = Game.find(params[:id])
    end
    def game_params
        params.require(:game).permit(:user_id, :score)
    end

end
