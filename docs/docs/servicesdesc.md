| 名称        | 说明                        |
| ------------| --------------------------- |
|服务地址     | http://ditu.zj.cn/services/divisionsearch| 
|服务描述     | 提供通过输入行政区划名(如浙江省、浙江省杭州市、浙江省杭州市西湖区等)进行查询相关行政区划信息及其直辖行政区划信息。|
|参数说明     | 见如下**服务各参数说明表**|
|返回值说明   | success：搜索请求是否成功，true表示成功，false表示不成功<br />message：行政区划查询提示信息<br />results：搜索结果总集，详见如下**返回结果results子项详细信息说明表** |
|请求示例     | http://ditu.zj.cn/services/divisionsearch?v=2&oid=330000-000-2120-%E6%B5%99%E6%B1%9F%E7%9C%81&geom=1000K |
|备注         |    无                                     |


**服务各参数说明表**

| 参数项            | 参数说明                          | 示例               |
| ----------------- | --------------------------------- | -------------------|
|v                  | 服务的接口版本号                  | v=2          |
|oid                | 行政区划ID（必须用encodeURI或java.net.URLEncoder.encode编码，名称需完整）     | oid=330000-000-2120-浙江省 |
|id                 | 自动编号ID，不与fullname、query、envelope参数配合使用，共存时只有参数id起作用 | id=2311     |
|envelope           | 行政区划矩形范围（包括minx, miny, maxx, maxy） | envelope =119.954976705883,30.5356767398084,119.954976705883,30.5356767398084(依次为minx, miny, maxx, maxy)     |
|fullname           | 行政区划全称                   | fullname=浙江省丽水市缙云县新建镇                   |
|geom               | 可选参数，1000k即返回1000个点左右的几何图形，500k即返回500个点左右的几何图形，200k即返回200各点左右的几何图形，1k即返回原始的几何图形，无此参数则不返回几何图形数据                   | geom=1000k    |
|withgeometry       | 返回的结果中是否包括行政区划界线的空间坐标串信息，true返回，false则不返回,如果不请求此参数，默认返回坐标串                   | withgeometry=false    |
|query              | 行政区划全称                     | query=%E6%B5%99%E6%B1%9F%E7%9C%81%E6%B8%A9%E5%B7%9E%E5%B8%82                   |
|callback           | 可选参数，JavaScript的回调函数，可用于解决ajax请求的跨域问题                         | callback=cb             |


**返回结果results子项详细信息说明表**

| 数据参数        | 参数说明                        |
| ----------------| ------------------------------- |
|oid          | 区划ID                                      | 
|name         | 区划名称                                    |
|ADDRESS      | 区划地址                                    |
|FULLNAME     | 区划全称，如浙江省杭州市                    |
|sectiontype  | 区划类别                                    |
|province     | 所属省                                      |
|city         | 所属市                                      | 
|town         | 所属县                                      |
|county       | 所属区                                      |
|labelx       | 经度                                        |
|labely       | 纬度                                        |
|CENTERX      | 行政中心点经度                              |
|CENTERY      | 行政中心点纬度                              |
|minx         | 外接矩形的最小经度值                        |
|miny         | 外接矩形的最小纬度值                        | 
|maxx         | 外接矩形的最大经度值                        |
|maxy         | 外接矩形的最大纬度值                        |
|geometry     | 几何属性（仅在result的子项中依请求参数geom返回相应比例尺的几何信息）                                        |
|children     | 子行政区划                                  |
|updatetime   | 更新时间                                    |
|objected     | 区划ID                                      |
|code         | 区划编码                                    |
