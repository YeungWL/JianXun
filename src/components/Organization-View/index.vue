
<style lang="scss">
// #org {
//   width: 10000px;
//   margin: 0px;
// }
.root {
  & > ul {
    margin-top: 0px;
  }
  .branch {
    display: inline-block;
    margin-top: 40px;
    position: relative;
    & > li:first-child {
      margin-left: 0px;
    }
    & > li:last-child {
      margin-right: 0px;
    }
    .card {
      /* display: inline-block; */
      width: 100%;
      position: relative !important;
      text-align: center;
      .line-column {
        position: absolute !important;
        width: 3px;
        height: 20px;
        background-color: black;
        left: calc(100% / 2 - 1px);
        &-header {
          top: -20px;
        }
        &-footer {
          height: 21px;
          bottom: -20px;
        }
      }
      .line-row {
        height: 3px;
        background-color: black;
        position: absolute;
        top: -21px;
        &-left {
          width: calc(50% + 20px);
          right: -20px;
        }
        &-center {
          width: calc(100% + 40px);
          right: -20px;
        }
        &-right {
          width: calc(50% + 20px);
          left: -20px;
        }
      }
      &-solt {
        display: inline-block;
        min-width: 50px;
        min-height: 100px;
        margin: 0 auto;
          box-sizing: border-box;
  border: 1px solid black;
      }
    }
    .node {
      display: inline-block;
      margin: 0 20px;
      position: relative;
      float: left;
    }
  }
}
</style>
<script>
export default {
  name: "OrganizationView",
  props: {
    "render-data": Array,
    prop: {
      children: String,
      classname: String
    }
  },
  render(h) {
    if(!this.renderData.length){
      return h('div');
    }
    return this.createTree(h);
  },
  methods: {
    createTree(h) {
      let prop = {
        children:
          this.prop && this.prop.children ? this.prop.children : "children",
        className:
          this.prop && this.prop.classname ? this.prop.classname : "organize"
      };
      let vnodes = this.recursive(h, this.renderData, prop, prop.className);
      // let a = {};
      let branch = h(
        "ul",
        {
          class: 'branch ' + prop.className +"-branch"
          
        },
        vnodes.vnodes
      );
      let root = h(
        "div",
        {
          class: 'root ' + prop.className
          
        },
        [branch]
      );
      setTimeout(() => {
        root.elm.style.width = "10000000px";
        if (vnodes.vnodes instanceof Array && vnodes.vnodes[0]) {
          // console.log(root.elm,branch.elm)
          root.elm.style.width = branch.elm.clientWidth + 10 + "px";
          //   console.log(root.elm.offsetWidth);
        }
      },0);
      // console.log(root)
      return root;
    },
    recursive(h, nodes, prop, className) {
      let child = null,
        newEl = null,
        card = null,
        branch = null,
        temp = null,
        elBox = [],
        cardBox = [],
        vnodes = [],
        newElClassName = "",
        slotCardDefault = h("div", {
          domProps: { innerHTML: "This is a solt for card;" }
        });
      for (var i = 0; i < nodes.length; i++) {
        if (i == 0) {
          temp = "left";
        } else if (i == nodes.length - 1) {
          temp = "right";
        } else {
          temp = "center";
        }
        child = nodes[i];
        cardBox = [];
        newElClassName = className + "_" + i;
        if (className !== prop.className) {
          cardBox.push(h("div", { class: "line-row line-row-" + temp }));
          cardBox.push(h("div", { class: "line-column line-column-header" }));
        }
        cardBox.push(
          h("div", { class: "card-solt", key: newElClassName }, [
            this.$scopedSlots.card
              ? this.$scopedSlots.card(nodes[i])
              : slotCardDefault
          ])
        );
        if (child[prop.children] instanceof Array &&child[prop.children][0]) {
          cardBox.push(h("div", { class: "line-column line-column-footer" }));
          card = h(
            "div",
            {
              class: "card " + prop.className + "-card"
            },
            cardBox
          );
          branch = h(
            "ul",
            { class: "branch " + prop.className + "-branch"},
            this.recursive(h, child[prop.children], prop, newElClassName).vnodes
          );
          elBox = [card, branch];
        } else {
          card = h(
            "div",
            {
              class: "card " + prop.className + "-card"
            },
            cardBox
          );
          elBox = [card];
        }
        newEl = h("li", { class: newElClassName + " node " + prop.className + "-node"}, elBox);

        vnodes.push(newEl);
      }
      return {
        vnodes: vnodes
      };
      //   console.log(nodes);
    }
  }
  // render(h){
  //     console.log(this.renderData)
  //     // console.log(h)
  //     return h('div',[
  //         h('div','aaaaa')
  //     ])
  //     // console.log(e)
  // }
};
</script>
