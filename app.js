$(document).ready(function() {
  let page = $('.paginatin').val()
  $.ajax({
      method: "POST",
      url: "http://api.themoviedb.org/3/movie/popular?api_key=2e901364c3d103dcb00ced520e9bca3c",
      dataType: "json",
    success: function(data){
      console.log(data)
      let page = 3

      $.each(data.results, function createFirstThreePosts (index,value){
          if(index<page){
              $('#pagin').append($(`
              <div class="post">
              <h2>${value.title}</h2>
              <p style="margin:15px"><b>Overview</b>: ${value.overview}</p>
              <img src="http://api.themoviedb.org/3/movie/popular?api_key=2e901364c3d103dcb00ced520e9bca3c${value.poster_path}"><br/>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
            More info
          </button>
              </div>`))
              moreInfo()
          }
      })

      $('#next').click(function addPage (){
        let pageNum = $(`.numb`).length
          $(this).parent().before($(`
            <li class="page-item"><a class="page-link numb" href="#">${pageNum+1}</a></li>`))
            $('.page-link').click(function createPostOnCurrentPage(e){
              page = $(this).text()
              $('#pagin').empty()
              $.each(data.results, function(index,value){
                if(index<3*page&&index>(3*page)-4){
                    $('#pagin').append($(`
                    <div class="post">
                        <h2>${value.title}</h2>
                        <p style="margin:15px"><b>Overview</b>: ${value.overview}</p>
                        <img src="http://api.themoviedb.org/3/movie/popular?api_key=2e901364c3d103dcb00ced520e9bca3c${value.poster_path}">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
            More info
          </button>
                    </div>`))
                }})
                moreInfo()
            })
            
      })

      $('.page-link').click(function createPostOnCurrentPage(){
        page = $(this).text()
        $('#pagin').empty()
        $.each(data.results, function(index,value){
          if(index<3*page&&index>(3*page)-4){
              $('#pagin').append($(`
              <div class="post">
                  <h2>${value.title}</h2>
                  <p style="margin:15px"><b>Overview</b>: ${value.overview}</p>
                  <img src="http://api.themoviedb.org/3/movie/popular?api_key=2e901364c3d103dcb00ced520e9bca3c${value.poster_path}">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
            More info
          </button>
              </div>`))
          }})
        moreInfo()
      })

function moreInfo() {
  $('.btn-primary').click(function showMore(){
    let s = $(this).parent().find('h2').text()
  
    $.each(data.results, function(index, value){
      
      console.log(s)
      if(s == value.title){
        $('.modal-body').empty()
        $('.modal-body').append($(`
                  <h2>${value.title}</h2>
                  <h4>${value.release_date}</h4>
                  <p style="margin:15px"><b>Overview</b>: ${value.overview}</p>
                  <img src="http://api.themoviedb.org/3/movie/popular?api_key=2e901364c3d103dcb00ced520e9bca3c${value.poster_path}">
        `))
      }
    })
  
  })
}
    }
  })

  
    $('#btn').click(function(e) {
      let btn = $(this);
      let title = $('#title').val()
      let month = $('#months').val()
      
    $.ajax({
      method: "POST",
      url: "http://api.themoviedb.org/3/movie/popular?api_key=2e901364c3d103dcb00ced520e9bca3c",
      dataType: "json",
      
      success: function(data) {
        let titleUp;
        let x;
        console.log(data)
        function upp(){
          titleUp = title.split('')
          
            $.each(titleUp, function(index, value){          
              if(index==0){
                titleUp[index] = value.toUpperCase()
              }})
      
            $.each(titleUp, function(index, value){                       
              if(value == ' '){
                x = index+1
                titleUp[x] = titleUp[x].toUpperCase()
              }})
            titleUp = titleUp.join('')
        }upp()
      
        function show(){
          let result;
          $.each(data.results, function(index,value){
            if(title != ''){
              if(value.title.indexOf(titleUp)!==-1&&value.release_date.indexOf(month)!==-1){
                console.log(titleUp)
                console.log(value)
                $("#show").html(`
                <h1>Film: ${value.title}</h1>
                <p><b>Overview</b>: ${value.overview}</p>
                `)
                result = value
              }
            }
          })
            if(result == undefined){
              alert(`Movie not found!`)
              }
        }
        show()
        },
      error: function(er) {
        console.log(er);
      }
    });
})
});