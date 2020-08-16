<template>
  <footer class="footer" :style="{'position':position}">
    <div class="container">
      <p class="float-left">
        Design by
        <a href="#" target="_blank">Derek HE</a>
        <span style="color: #e27575;font-size: 14px;">❤</span>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
    props: ['position']
}
</script>