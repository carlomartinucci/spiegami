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

class Block < ApplicationRecord

  validates :title, presence: true, allow_blank: false
  validates :body, presence: true, allow_blank: false

  has_many :references
  has_many :referenced_blocks, through: :references, foreign_key: :referenced_block_id

  def to_param
    "#{self.id}-#{self.title}"
  end

end
