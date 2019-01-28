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

class Reference < ApplicationRecord
  validates :block, presence: true, uniqueness: { scope: :referenced_block }
  validates :referenced_block, presence: true

  belongs_to :block
  belongs_to :referenced_block, class_name: 'Block'
end
