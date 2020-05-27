<template>
  <div>
    <vHeader @handleSearch="handleSearch" />
    <div class="goonshopp">
        <router-link :to="{name:'class',query:{sp:sp}}" v-if="sp && sp!=='undefined'">继续购物</router-link>
        <router-link :to="{name:'index'}" v-else>继续购物</router-link>
    </div>
    <el-table
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
    >
      <el-table-column label="商品信息" min-width="300" align="center">
        <template slot-scope="scope">
            <img width="100px" :src="scope.row.url" alt="">
            <span class="title">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" min-width="200"  align="center">
          <template slot-scope="scope">
           ¥ {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="count" min-width="200" label="购买数量" show-overflow-tooltip  align="center"></el-table-column>
      <el-table-column prop="totalprice" min-width="200" label="合计" show-overflow-tooltip  align="center"></el-table-column>
      <el-table-column label="操作" min-width="200">
      <template slot-scope="scope">
        <el-row type="flex" justify="end" style="width:100%;margin-right:84px;">
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </el-row>
      </template>
    </el-table-column>
    <div v-if="list.length" slot="append" style="padding: 120px 0 60px;">
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-row type="flex" justify="space-around" align="middle">
            <div>
              总价：<span class="f-red">￥{{money}}</span>
            </div>
            <el-button style="width:150px" type="danger" @click="pay">去结算</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    </el-table>
    <el-dialog title="确认订单信息" :visible.sync="visible" width="80%">
      <el-table
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        >
          <el-table-column label="商品信息" min-width="300" align="center">
            <template slot-scope="scope">
                <img width="100px" :src="scope.row.url" alt="">
                <span class="title">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" min-width="200"  align="center">
              <template slot-scope="scope">
              ¥ {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column prop="count" min-width="200" label="购买数量" show-overflow-tooltip  align="center"></el-table-column>
          <el-table-column prop="totalprice" min-width="200" label="合计" show-overflow-tooltip  align="center"></el-table-column>
          <div v-if="list.length" slot="append" style="padding: 60px 0 60px;">
            <el-row type="flex" justify="end">
              <div style="font-size: 30px;margin-right: 30px;">
                总价：<span class="f-red">￥{{money}}</span>
              </div>
            </el-row>
          </div>
        </el-table>
        <el-row type="flex" align="middle" style="padding: 20px;">
          <el-button style="margin-right: 50px;" @click="innerVisible = true" type="primary">请选择收货地址</el-button>
          <div v-show="address">
            <em>收货地址：</em>
            <span>{{address}}</span>
          </div>
        </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="jiesuan">结 算</el-button>
      </div>
      <el-dialog
        width="50%"
        :visible.sync="innerVisible"
        append-to-body>
        <template slot="title">
          <div>
            <span>收货地址</span>
            <el-button size="mini" icon="el-icon-plus" @click="addAddress=!addAddress"></el-button>
          </div>
        </template>
        <div v-if="!addAddress">
          <div v-for="(item,index) in adressList" :key="`${item}${index}`" @click="handle(item)"><el-radio v-model="selectedAddress" :label="`${item && item.province}${item && item.city}${item && item.detail}`" >{{`${item && item.province}${item && item.city}${item && item.detail}`}}</el-radio></div>
        </div>
        <el-form v-else :model="ruleForm" :rules="rules" ref="numberValidateForm" label-position="left" label-width="100px" class="demo-ruleForm">
          <el-form-item label="收货地址">
            <el-select style="width: 49.6%" @change="provinceChange" v-model="ruleForm.province" filterable placeholder="请选择省份">
              <el-option
                v-for="item in provinceList"
                :key="item"
                :label="item"
                :value="item"
                >
              </el-option>
            </el-select>
            <el-select style="width: 49.6%" @change="cityChange" v-model="ruleForm.city" filterable placeholder="请选择城市">
              <el-option
                v-for="item in cityList"
                :key="item"
                :label="item"
                :value="item"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="detail">
            <el-input v-model="ruleForm.detail" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="收货人姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入收货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">新增收货地址</el-button>
            <el-button @click="resetForm('numberValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSelect">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        width="50%"
        :visible.sync="payVisible"
        append-to-body>
        <p class="tip">温馨提示：请使用微信或支付宝支付</p>
        <p class="pagImg">
          <img src="/static/images/wexin.png" alt="">
          <img src="/static/images/zfb.png" alt="">
        </p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="payVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfireorder">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import vHeader from "@/components/vHeader";
export default {
  data() {
    return {
      sp:null,
      payVisible:false,
      list: [],
      visible: false,
      innerVisible: false,
      adressList: [],
      address: "",
      selectedAddress: "",
      addAddress: false,
      ruleForm: {
        detail: "",
        name: "",
        tel: "",
        province: "",
        city: ""
      },
      provinceList: ['请选择省份','北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','广西省','海南省','四川省','贵州省','云南省','西藏省','陕西省','甘肃省','宁夏省','青海省','新疆省','香港','澳门','台湾'],
      cityList: [],
      citys: [
        ['请选择城市'],
        ["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县"],
        ["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县"],
        ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "宁河县", "静海县", "蓟县"],
        ["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "黔江区", "长寿区", "綦江县", "潼南县", "铜梁县", "大足县", "荣昌县", "璧山县", "梁平县", "城口县", "丰都县", "垫江县", "武隆县", "忠县", "开县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县", "江津市", "合川市", "永川市", "南川市"],
        ["石家庄市","张家口市","承德市","秦皇岛市","唐山市","廊坊市","保定市","衡水市","沧州市","邢台市","邯郸市"],
        ["太原市","朔州市","大同市","阳泉市","长治市","晋城市","忻州市","晋中市","临汾市","吕梁市","运城市"],
        ["呼和浩特市","包头市","乌海市","赤峰市","通辽市","呼伦贝尔市","鄂尔多斯市","乌兰察布市","巴彦淖尔市","兴安盟","锡林郭勒盟","阿拉善盟"],
        ["沈阳市","朝阳市","阜新市","铁岭市","抚顺市","本溪市","辽阳市","鞍山市","丹东市","大连市","营口市","盘锦市","锦州市","葫芦岛市"],
        ["长春市","白城市","松原市","吉林市","四平市","辽源市","通化市","白山市","延边州"],
        ["哈尔滨市","齐齐哈尔市","七台河市","黑河市","大庆市","鹤岗市","伊春市","佳木斯市","双鸭山市","鸡西市","牡丹江市","绥化市","大兴安岭地区"],
        ["南京市","徐州市","连云港市","宿迁市","淮安市","盐城市","扬州市","泰州市","南通市","镇江市","常州市","无锡市","苏州市"],
        ["杭州市","湖州市","嘉兴市","舟山市","宁波市","绍兴市","衢州市","金华市","台州市","温州市","丽水市"],
        ["合肥市","宿州市","淮北市","亳州市","阜阳市","蚌埠市","淮南市","滁州市","马鞍山市","芜湖市","铜陵市","安庆市","黄山市","六安市","巢湖市","池州市","宣城市"],
        ["福州市","南平市","莆田市","三明市","泉州市","厦门市","漳州市","龙岩市","宁德市"],
        ["南昌市","九江市","景德镇市","鹰潭市","新余市","萍乡市","赣州市","上饶市","抚州市","宜春市","吉安市"],
        ["济南市","青岛市","聊城市","德州市","东营市","淄博市","潍坊市","烟台市","威海市","日照市","临沂市","枣庄市","济宁市","泰安市","莱芜市","滨州市","菏泽市"],
        ["郑州市","开封市","三门峡市","洛阳市","焦作市","新乡市","鹤壁市","安阳市","濮阳市","商丘市","许昌市","漯河市","平顶山市","南阳市","信阳市","周口市","驻马店市","济源市"],
        ["武汉市","十堰市","襄樊市","荆门市","孝感市","黄冈市","鄂州市","黄石市","咸宁市","荆州市","宜昌市","随州市","省直辖县级行政单位","恩施州"],
        ["长沙市","张家界市","常德市","益阳市","岳阳市","株洲市","湘潭市","衡阳市","郴州市","永州市","邵阳市","怀化市","娄底市","湘西州"],
        ["广州市","深圳市","清远市","韶关市","河源市","梅州市","潮州市","汕头市","揭阳市","汕尾市","惠州市","东莞市","珠海市","中山市","江门市","佛山市","肇庆市","云浮市","阳江市","茂名市","湛江市"],
        ["南宁市","桂林市","柳州市","梧州市","贵港市","玉林市","钦州市","北海市","防城港市","崇左市","百色市","河池市","来宾市","贺州市"],
        ["海口市","三亚市","省直辖县级行政单位"],
        ["成都市","广元市","绵阳市","德阳市","南充市","广安市","遂宁市","内江市","乐山市","自贡市","泸州市","宜宾市","攀枝花市","巴中市","达州市","资阳市","眉山市","雅安市","阿坝州","甘孜州","凉山州"],
        ["贵阳市","六盘水市","遵义市","安顺市","毕节地区","铜仁地区","黔东南州","黔南州","黔西南州"],
        ["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","思茅市","临沧市","德宏州","怒江州","迪庆州","大理州","楚雄州","红河州","文山州","西双版纳州"],
        ["拉萨市","那曲地区","昌都地区","林芝地区","山南地区","日喀则地区","阿里地区"],
        ["西安市","延安市","铜川市","渭南市","咸阳市","宝鸡市","汉中市","榆林市","安康市","商洛市"],
        ["兰州市","嘉峪关市","白银市","天水市","武威市","酒泉市","张掖市","庆阳市","平凉市","定西市","陇南市","临夏州","甘南州"],
        ["西宁市","海东地区","海北州","海南州","黄南州","果洛州","玉树州","海西州"],
        ["银川市","石嘴山市","吴忠市","固原市","中卫市"],
        ["乌鲁木齐市","克拉玛依市","自治区直辖县级行政单位","喀什地区","阿克苏地区","和田地区","吐鲁番地区","哈密地区","克孜勒苏柯州","博尔塔拉州","昌吉州","巴音郭楞州","伊犁州","塔城地区","阿勒泰地区"],
        ["香港"],
        ["澳门"],
        ["台北市","高雄市","台中市","花莲市","基隆市","嘉义市","金门市","连江市","苗栗市","南投市","澎湖市","屏东市","台东市","台南市","桃园市","新竹市","宜兰市","云林市","彰化市"]
      ],
      rules: {
        detail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          {min: 5, max: 120, message: '详细地址长度需要在5-120个汉字或字符', trigger: 'blur'},
          { pattern: /.*[^\s]/, message: '不可为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '姓名长度在 3 到 5 个字符', trigger: 'blur' },
          { pattern: /.*[^\s]/, message: '不可为空', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
      }
    };
  },
  computed:{
    ...mapGetters(["getUser"]),
    money(){
      let money = 0;
      this.list.forEach(item => {
        money += item.price*item.count
      })
      return money
    },
    count(){
      let count = 0;
      this.list.forEach(item => {
        count += item.count
      })
      return count;
    }
  },
  methods: {
    handleSearch(val) {
      this.$router.push(`/search?keywords=${val}`)
    },
    handle(item){
      this.selectedAddress = `${item.province}${item.city}${item.detail}`
    },
    provinceChange(val){
      let index = this.provinceList.findIndex(item => val === item)
      this.cityList = this.citys[index]
    },
    cityChange(){},
    jiesuan(){
      this.visible = false;
      this.payVisible = true;
    },
    fetchList(){
      this.$get('api/cart/get',{id: this.getUser.user_id}).then(res=> {
        this.list = res.list
      })
    },
    pay() {
      this.visible = true;
    },
    handleSelect(){
      this.address = this.selectedAddress;
      this.innerVisible = false;
    },
    comfireorder(){
      let loadingInstance1 = this.$Loading.service({ fullscreen: true });
      setTimeout(()=>{
        loadingInstance1.close();
        this.$message({
        type: 'success',
        message: '支付成功，请等待收货!'
        });
        this.payVisible = false
        this.$post('api/cart/clear',{user_id: this.getUser.user_id}).then(res=> {
          // this.list = res.list
          if(res.code == 0){
            this.list = []
          }else{
            this.$message.error(res.message);
            
          }
          console.log(res)
          this.$router.push('/myorder')
        })
      },3000)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.adressList.push(this.ruleForm.address)
          
          this.handleAddAddress()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleDelete(index, row) {
        this.$confirm('是否删除该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post('api/cart/del',{
            user_id:row.user_id,
            id: row.id
          })
          .then(res=> {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.fetchList()
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = '';
        }
      });
      return sums;
    },
    getaddress() {
      this.$get("api/myAddress/getAddress",{
        id: this.getUser.user_id
      })
      .then(res => {
        console.log(res)
        this.adressList = res.list
      })
    },
    handleAddAddress() {
      this.$post("api/myAddress/add",{
        id: this.getUser.user_id,
        create_time: this.$dateTime.formatData(),
        ...this.ruleForm
      })
      .then(res => {
        console.log(res)
        this.getaddress();
        this.resetForm('numberValidateForm');
        this.addAddress = !this.addAddress
      })
    }
  },
  created() {
    this.fetchList();
    this.getaddress();
    this.sp = this.$route.query.sp
  },
  watch: {},
  components: {
    vHeader
  }
};
</script>

<style lang="scss" scoped>
.goonshopp {
  width: 200px;
  height: 48px;
  background: #254000;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  float: right;
  margin-right: 100px;
  clear: both;
  cursor: pointer;
  a {
    color: white;
  }
}
.title{
    width: 150px;
    display: inline-block;
}
.el-table {
 /deep/ .cell {
     display: flex;
     align-items: center;
     justify-content: center;
 }
}
.t-r {
  text-align: right;
}
.tip{
  color: red;
  font-size: 22px;
  margin-bottom: 22px;
  text-align: center;
}
.pagImg{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
