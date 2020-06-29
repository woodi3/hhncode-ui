<template>
    <div class='ripple-background' title="ripple animation">
        <div class='circle xxlarge shade1'></div>
        <div class='circle xlarge shade2'></div>
        <div class='circle large shade3'></div>
        <div class='circle mediun shade4'></div>
        <div class='circle small shade5'></div>
    </div>

</template>

<style scoped>

.circle{
  position: absolute;
  border-radius: 50%;
  background: white;
  animation: ripple 15s infinite;
  box-shadow: 0px 0px 1px 0px #508fb9;
}

.small{
  width: 150px;
  height: 150px;
  left: -75px;
  bottom: -75px;
}

.medium{
  width: 300px;
  height: 300px;
  left: -150px;
  bottom: -150px;
}

.large{
  width: 450px;
  height: 450px;
  left: -225px;
  bottom: -225px;
}

.xlarge{
  width: 600px;
  height: 600px;
  left: -300px;
  bottom: -300px;
}

.xxlarge{
  width: 750px;
  height: 750px;
  left: -375px;
  bottom: -375px;
}

.shade1{
  opacity: 0.2;
}
.shade2{
  opacity: 0.5;
}

.shade3{
  opacity: 0.7;
}

.shade4{
  opacity: 0.8;
}

.shade5{
  opacity: 0.9;
}

@keyframes ripple{
  0%{
    transform: scale(0.8);
  }
  
  50%{
    transform: scale(1.2);
  }
  
  100%{
    transform: scale(0.8);
  }
}

</style>