require 'rails_helper'

RSpec.describe User, :type => :model do
  it { should respond_to "provider" }
  it { should respond_to "uid" }
  it { should respond_to "name" }
  it { should respond_to "token" }
  it { should respond_to "token_secret" }
end

