$(() => {
    // Global Variables
    let currentImgIndex = 0
    let numOfImages = $('.carousel-images').children().length - 1
    const $carouselImages = $('.carousel-images').children()
    
    //Next button
    $('.next').on('click', () => {
      $carouselImages.eq(currentImgIndex).css('display', 'none')
      if(currentImgIndex < numOfImages){
        currentImgIndex++
      } else {
        currentImgIndex = 0
      }
      $carouselImages.eq(currentImgIndex).css('display', 'block')
    })
    
    // Previous Button
    $('.previous').on('click', () => {
      $carouselImages.eq(currentImgIndex).css('display', 'none')
    
      if(currentImgIndex > 0){
        currentImgIndex--
      } else {
        currentImgIndex = numOfImages
      }
    
      $carouselImages.eq(currentImgIndex).css('display', 'block')
    })
})