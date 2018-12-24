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

  validates :title, uniqueness: true, presence: true, allow_blank: false
  validates :body, presence: true, allow_blank: false

  has_many :references
  has_many :referenced_blocks, through: :references, foreign_key: :referenced_block_id

  def to_param
    "#{self.id}-#{self.title}"
  end

  def self.create_block_tree(block_tree)
    block      = Block.find_or_initialize_by(title: block_tree['title'])
    block.body = block_tree['body']

    block.save

    if block_tree['blocks'].present?
      block.referenced_blocks = block_tree['blocks'].map do |block_node|
        create_block_tree(block_node)
      end
    end

    block
  end


end
