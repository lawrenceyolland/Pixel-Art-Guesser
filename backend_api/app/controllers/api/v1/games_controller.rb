class Api::V1::GamesController < ApplicationController
  before_action :set_game, only: [:destroy, :show, :update]
    def index
      games = Game.all
      render json: Api::V1::GameSerializer.new(games)
    end
    def create
        Game.create(game_params)
    end

    private

    def set_game
      @game = Game.find(params[:id])
    end
    def game_params
        params.require(:game).permit(:user_id, :result, :score)
    end

end
