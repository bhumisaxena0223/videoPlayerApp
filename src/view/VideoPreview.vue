<template>
  <div class="container pt-3">
    <div class="card mb-3" v-for="item in videoDescription" :key="item.id">
      <video height="500" controls>
        <source :src="`http://localhost:1337${item.url}`" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="card-body">
        <h3 class="card-title">Video: {{ item.name.replace(".mp4", "") }}</h3>
        <div class="row py-3">
          <div class="col-sm text-left">
            <strong> Views: {{ views }} </strong>
          </div>
          <div class="col-sm comment text-left">
            <p><strong> Comments:</strong></p>
            <ul
              v-for="comment in comments"
              :key="comment.id"
              class="list-group"
            >
              <li class="list-group-item">{{ comment.comments }}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="input-group mb-3 w-50 col-sm">
            <input
              type="text"
              v-model="addcomment"
              class="form-control"
              placeholder="share your views"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                @click="addCommentOnVideo()"
                type="button"
              >
                Add new comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "../helpers/api.json";

export default {
  name: "VideoPreview",
  props: {
    msg: String,
  },
  created() {
    this.getVideoList();
    this.viewCount();
  },
  data() {
    return {
      videoDescription: {},
      views: 0,
      viewCounter: 0,
      comments: {},
      addcomment: "",
      viewAndComment: {},
    };
  },
  methods: {
    getVideoList() {
      axios
        .get(`${url.url}videos/${this.$route.params.id}`)
        .then(({ data: resp }) => {
          this.videoDescription = resp.videoname;
          this.comments = resp.likes_and_comments;
          // console.log("j");
        })
        .catch(() => {});
    },
    viewCount() {
      axios
        .get(`${url.url}videos/${this.$route.params.id}`)
        .then(({ data: resp }) => {
          this.viewCounter = resp.viewcounts;
          axios
            .put(`${url.url}videos/${this.$route.params.id}`, {
              viewcounts: this.viewCounter + 1,
            })
            .then(({ data: resp }) => {
              this.views = resp.viewcounts;
            });
        })
        .catch(() => {});
    },
    // addcomment method
    addCommentOnVideo() {
      axios
        .post(`${url.url}likes-and-comments`, {
          video: this.$route.params.id,
          comments: this.addcomment,
        })
        .then(() => {
          this.addcomment = "";
          this.getVideoList();
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div.comment {
  width: 110px;
  height: 150px;
  overflow: scroll;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.comment::-webkit-scrollbar {
  display: none;
}
</style>
