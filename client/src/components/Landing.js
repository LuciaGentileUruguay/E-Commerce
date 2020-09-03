import React from 'react';
import './landing.css'

export default function Landing () {
 return (
   <div>
     
<div> 

<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://estaticos.qdq.com/swdata/home_photos/399/399647927/51e2525523da4c24af93ebe32e312cc5.jpg"/>
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://www.ecestaticos.com/image/clipping/5e6a18e117f62958562d2e8354a18af0/las-verduras-de-hoja-verde-que-mejor-sientan-a-tu-cuerpo.jpg" alt="..." />
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://hidroponia.mx/wp-content/uploads/2014/10/forraje-verde-hidropc3b3nico.jpg" class="d-block w-100"/>
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</div>

<footer class="page-footer font-small special-color-dark pt-4">
  <div class="redes-container">
    <ul>
      <li><a class="btn-floating btn-fb mx-1"><i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a></li>
      <li><a class="btn-floating btn-tw mx-1"><i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a></li>
      <li><a class="btn-floating btn-gplus mx-1"><i class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a></li>
      <li><a class="btn-floating btn-li mx-1"><i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a></li>
      <li><a class="btn-floating btn-li mx-1"><i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i></a></li>
    </ul>
  </div> 

  <div class="footer-copyright text-center py-3">
    <a href="https://mdbootstrap.com/"> Universo Verde</a>
  </div>


</footer>

</div>
)
}
