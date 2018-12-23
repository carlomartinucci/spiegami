# == Schema Information
#
# Table name: blocks
#
#  id         :bigint(8)        not null, primary key
#  title      :string
#  body       :text
#  origin     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class BlockTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
