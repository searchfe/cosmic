<script>
    export let a = 1;
</script>
<div>
    <div class="popup-core"></div>
</div>

<style>
    .popup-core {     
        position: absolute;
        left:0;
        top:0;
        float: left; 
        text-indent: -9999em;     
        border-top: 6px solid rgba(255, 200, 0, 1);     
        border-right: 6px solid rgba(255, 200, 0, 1);     
        border-bottom: 6px solid rgba(255, 200, 0, 1);     
        border-left: 6px solid rgba(255, 128, 0, 1);     
        -webkit-animation: load8 1.1s infinite linear;     
        animation: load8 5s infinite linear;     
  
        border-radius: 50%;     
        width: 30px;     
        height: 30px; 
    } 
</style>