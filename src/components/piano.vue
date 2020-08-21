<template>
  <div>
    <div class="container"
         id="container">

    </div>
  </div>
</template>


<script>
import { initUI, initAudio } from '../../public/piano/index'
import { MIDISound } from '../../public/piano/audio'
export default {
  name: 'piano',
  mounted () {
    this.init(document.getElementById("container"), MIDISound)
  },
  methods: {
    init: function (obj, sound) {
      initUI(obj, sound)
      initAudio()
    }
  }
}
</script>

