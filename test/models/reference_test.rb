# == Schema Information
#
# Table name: references
#
#  id                  :bigint(8)        not null, primary key
#  block_id            :integer
#  referenced_block_id :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'test_helper'

class ReferenceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
