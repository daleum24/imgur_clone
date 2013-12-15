class RegionsController < ApplicationController
  def index
    @regions = self.current_user.regions
  end
  
  def new
    
  end
  
  def create
    @region = Region.new(params[:region])
    @region.user_id = self.current_user.id
    
    if @region.save
      redirect_to user_regions_url(self.current_user.id)
    else
      flash[:errors] = @region.errors.full_messages
      redirect_to new_user_region_url(self.current_user.id)
    end
    
  end
  
  def show
    @region = Region.find(params[:id])
  end
  
  def destroy
    @region = Region.find(params[:id])
    @region.destroy
    
    redirect_to user_regions_url(self.current_user)
  end
  
end