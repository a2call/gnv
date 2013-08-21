module RetinaImageHelper

  def retina_image_tag image
    "<img class=\"retina-img\" alt=\"#{image.retina.url}\" src=\"#{image.common.url}\" width=\"300\" height=\"190\" />".html_safe
  end

  def full_bleed_image_tag image
    "<img class=\"retina-img\" alt=\"#{image.retina_full_bleed.url}\" src=\"#{image.common_full_bleed.url}\" width=\"465\" height=\"190\" />".html_safe
  end
end