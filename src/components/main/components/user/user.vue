<template>
  <div class="user-avator-dropdown">
  
     <Dropdown  @on-click="handleClick">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon :size="18" type="md-arrow-dropdown"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <!-- <DropdownItem name="ownSpace">个人中心</DropdownItem> -->
                                    <DropdownItem name="logout">退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
  </div>
</template>

<script>
import './user.less'
import Cookies from 'js-cookie'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  data () {
            return {
                userName: ''
            };
        },
  // props: {
  //   userAvator: {
  //     type: String,
  //     default: ''
  //   },
  //   messageUnreadCount: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  //  computed: {
  //       ...mapState({
  //           userName: ({User}) => User.userName
  //           // userName:state => state.userName
  //       })
  //   },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    init () {
       this.userName = Cookies.get('userName')
            },
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  },
  mounted () {
            this.init();
        }
}
</script>
