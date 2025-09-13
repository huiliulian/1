
		
		
		// ① 封装一个“按列值改列值”的万能函数
		async function updateByTitle(username, localId) {
		
			// 1. 拿到 News 表的操作句柄
			//    Bmob   ← 全局 SDK 对象（前面已 initialize）
			//    .Query("News")  ← 告诉 SDK 我要操作 News 表
			const query = Bmob.Query("user");
		
			// 2. 添加查询条件：title 列必须等于 oldTitle
			//    .equalTo("列名", 值)  ← 条件语句，可链式叠加
			query.equalTo("tel", username);
		
			// 3. 只拿一条（假设 title 唯一）
			//    .limit(1)      ← 限制结果数量，省流量
			//    .find()        ← 真正发请求，返回 Promise<Array>
			const [row] = await query.limit(1).find();
		
			// 4. 如果没找到就结束
			if (!row) {
				console.log("没找到数据: ", username);
				return;
			}
		
			// 5. 在内存里修改字段
			//    row  ← 单条记录对象，含 objectId
			//    .set("列名", 新值)  ← 覆盖旧值
			row.set("loginIdentifier", localId);
		
			// 6. 数字列自增，先取出旧值再加 1
			// const oldPv = row.get("pv");   // 取出旧数字
			// row.set("pv", oldPv + 1);
		
			// 7. 把改动一次性写回云端
			//    .save()  ← 返回 Promise，成功后整条最新数据会回来
			await row.save();
		
			// 8. 打印结果
			console.log("修改完成", {
				objectId: row.objectId,
				newContent: row.get("loginIdentifier"),
				// newPv: row.get("pv")
			});
		}
		
		
		
		
		
		
		
		
	
	
	// ① 封装一个“按列值改列值”的万能函数
	async function update_authenticatio() {
	
		// 1. 拿到 News 表的操作句柄
		//    Bmob   ← 全局 SDK 对象（前面已 initialize）
		//    .Query("News")  ← 告诉 SDK 我要操作 News 表
		const query = Bmob.Query("user");
	
		// 2. 添加查询条件：title 列必须等于 oldTitle
		//    .equalTo("列名", 值)  ← 条件语句，可链式叠加
		query.equalTo("tel", username);
	
		// 3. 只拿一条（假设 title 唯一）
		//    .limit(1)      ← 限制结果数量，省流量
		//    .find()        ← 真正发请求，返回 Promise<Array>
		const [row] = await query.limit(1).find();
	
		// 4. 如果没找到就结束
		if (!row) {
			console.log("没找到数据: ", username);
			return;
		}
		
		
		
		
		  const tb_url = document.getElementById('taobaoShop').value;
		  const albb_url = document.getElementById('alibabaShop').value;
		  const local_url = document.getElementById('pandaShop').value;
			const tm_url = document.getElementById('tmallShop').value;	
		const zfb_zh = document.getElementById('alipayAccount').value;
		const payeeNAME = document.getElementById('payee').value;
			const BankCard = document.getElementById('bankAccount').value;
						
		
		
		
		
		
		// 5. 在内存里修改字段
		//    row  ← 单条记录对象，含 objectId
		//    .set("列名", 新值)  ← 覆盖旧值


		
		row.set("tb_url", tb_url);
		row.set("albb_url", albb_url);
		row.set("local_url", local_url);
		row.set("tm_url", tm_url);
		row.set("zfb_zh", zfb_zh);
		row.set("payeeNAME", payeeNAME);
		row.set("BankCard", BankCard);
		
		
		
		
	
		// 6. 数字列自增，先取出旧值再加 1
		// const oldPv = row.get("pv");   // 取出旧数字
		// row.set("pv", oldPv + 1);
	
		// 7. 把改动一次性写回云端
		//    .save()  ← 返回 Promise，成功后整条最新数据会回来
		await row.save();
	
		// 8. 打印结果
		console.log("修改完成", {
			objectId: row.objectId,
			newContent: row.get("loginIdentifier"),
			// newPv: row.get("pv")
		});
	}
	