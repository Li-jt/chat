const itemKey = {
  info: 'info'
}

new Vue({
  el: '#app',
  data() {
    return {
      msg: '',
      infos: [],
      scrollHeight: 0
    }
  },
  watch: {
    scrollHeight: function (val, old) {
      this.autoScroll();
    }
  },
  mounted() {
    this.infos = getLocalStorage(itemKey.info, []);
    this.scrollHeight = this.$refs.nav.scrollHeight;
  },
  methods: {
    send() {
      if (this.msg === '') return;
      let cont = {
        avatar: getRandom(1, 10),
        msg: this.msg
      }
      this.infos.push(cont);
      setLocalStorage(itemKey.info, this.infos);
      this.msg = '';
    },
    autoScroll() {
      this.$nextTick(() => {
        console.log(this.$refs.nav.scrollHeight);
        this.$refs.nav.scrollTop = this.$refs.nav.scrollHeight;
      })
    }
  },
})

// 生成随机数（整数），包含min，包含max
function getRandom(min, max, num = 1) {
  if (typeof min != 'number' || typeof max != 'number' || typeof num != 'number') return null;
  if (num > 1) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(Math.floor(Math.random() * (max - min + 1) + min));
    }
    return arr;
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

function setLocalStorage(key, val) {
  val = typeof val !== 'string' ? JSON.stringify(val) : val;
  localStorage.setItem(key, val)
}

function getLocalStorage(key, def) {
  let cont = localStorage.getItem(key);
  try {
    return JSON.parse(cont) || def;
  } catch (error) {
    return cont || def
  }
}