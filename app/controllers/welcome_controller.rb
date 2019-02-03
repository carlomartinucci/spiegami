class WelcomeController < ApplicationController
  def index
    @spiegami_block = Block.find_by(title: 'Spiegami è utile per formarsi un\'opinione')
  end

  def prototype
    render layout: 'empty'
  end

  def write
    @title = 'Lo smartworking è un diritto'
  end
end
