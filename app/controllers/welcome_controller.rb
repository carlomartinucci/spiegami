class WelcomeController < ApplicationController

  def index
    @spiegami_block = Block.find_by(title: 'Spiegami è utile per formarsi un\'opinione')
  end

end
