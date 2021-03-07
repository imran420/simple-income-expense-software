$(document).ready(function() {
	$('.nav-trigger').click(function() {
		$('.side-nav').toggleClass('visible');
	});
});

$('.feat-btn').click(function(){
  $('nav ul .feat-show').toggleClass("show");
  $('nav ul .first').toggleClass("rotate");
});
$('.serv-btn').click(function(){
  $('nav ul .serv-show').toggleClass("show1");
  $('nav ul .second').toggleClass("rotate");
});
$('.serv-d-btn').click(function(){
  $('nav ul .serv-d-show').toggleClass("show2");
  $('nav ul .third').toggleClass("rotate");
});

$('.serv-b-btn').click(function(){
  $('nav ul .serv-b-show').toggleClass("show3");
  $('nav ul .forth').toggleClass("rotate");
});


$('nav ul li').click(function(){
  $(this).addClass("active").siblings().removeClass("active");
});