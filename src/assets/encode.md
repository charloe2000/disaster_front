# 基础地理信息编码
基本地理信息编码有9位，其中1 ~ 6位表示省、市、县（市、区）代码。
第7 ~ 9位表示乡、镇或街道办事处代，001 ~ 099表示街道办事处，100 ~ 199表示镇，200 ~ 399表示乡；
第10 ~ 12位表示行政村、社区代码。
![](https://md.byr.moe/uploads/upload_db8c3ab3dc42674d68c6fb55e3641bab.png)



# 灾情信息编码
灾情信息编码第1位表示灾情信息分类的大类；
第2 ~ 3位是子类代码；
第4 ~ 6位是要素顺序代码；
第7位表示灾情破坏等级
![](https://md.byr.moe/uploads/upload_5aa209148efdaf2cfab64a072e124071.png)



# 读取xml文件并存入数据库
读取xml文件并获取其中的信息，然后根据不同的数据类型存入数据库不同的表中。

获取xml文件中所有info节点集合
```
//创建DocumentBuilder对象
            DocumentBuilder db = dbf.newDocumentBuilder();
            //Document的parse方法读取xml文件
            Document document = db.parse("EarthquakeTemplate.xml");
            //获取所有info节点集合
            NodeList nodeList = document.getElementsByTagName("info");

```

从节点中读取数据
```
//xml文件中读取到的数据
String province  = document.getElementsByTagName("province").item(i).getFirstChild().getNodeValue();
String city  = document.getElementsByTagName("city").item(i).getFirstChild().getNodeValue();
String country  = document.getElementsByTagName("country").item(i).getFirstChild().getNodeValue();
String town  = document.getElementsByTagName("town").item(i).getFirstChild().getNodeValue();
String village  = document.getElementsByTagName("village").item(i).getFirstChild().getNodeValue();
String category  = document.getElementsByTagName("category").item(i).getFirstChild().getNodeValue();
String date  = document.getElementsByTagName("date").item(i).getFirstChild().getNodeValue();
String location  = document.getElementsByTagName("location").item(i).getFirstChild().getNodeValue();
double longitude  = Double.parseDouble(document.getElementsByTagName("longitude").item(i).getFirstChild().getNodeValue());
double latitude  = Double.parseDouble(document.getElementsByTagName("latitude").item(i).getFirstChild().getNodeValue());
int depth=Integer.parseInt(document.getElementsByTagName("depth").item(i).getFirstChild().getNodeValue());
double magnitude  = Double.parseDouble(document.getElementsByTagName("magnitude").item(i).getFirstChild().getNodeValue());
String reportingUnit  = document.getElementsByTagName("reportingUnit").item(i).getFirstChild().getNodeValue();
String picture  = document.getElementsByTagName("picture").item(i).getFirstChild().getNodeValue();

String earthquakeId = getGeocoderLatitude.getAddrCode(town);

```

存入数据库
```
//存入数据库
String sql=String.format(earthquake_sql,earthquakeId,province,city,country,town,village,
                        category,date,location,longitude,latitude,depth,magnitude,reportingUnit,picture);
Statement statement=conn.createStatement();
statement.executeUpdate(sql);
```