class Api::V1::GamesController < ApplicationController
    def create
        @api_v1_game_entry = Game.new(game_params)

        if @api_v1_game_entry.save
          render json: @api_v1_game_entry, status: :created, location: @api_v1_game
        else
          render json: @api_v1_game_entry.errors, status: :unprocessable_entity
        end 
    end

    private

    def game_params
        params.require(:games).permit(:user_id, :result, :score)
    end

end
