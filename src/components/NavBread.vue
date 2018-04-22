<template>
<div class=" mb-3">
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">首页</a></li>
        <li class="breadcrumb-item active" aria-current="page"><slot></slot></li>
      </ol>
    </nav>
  </div>
</div>
</template>
<style>
.bread{
      height: 45px;
      line-height: 45px;
      background-color: #f0f0f0;
  }
  .bread-wrap{
      padding: 0 10px;
      font-size: 14px;
      color: #a1a1a1;
  }
  .bread-wrap a{
    position: relative;
      margin-right: 20px;
  }
  .bread-wrap a:after{
      position: absolute;
      top: 0px;
      content:'/';
      height:20px;
      line-height: 20px;
  }
  .bread-wrap span{
      color:#d1434a;
  }
</style>
