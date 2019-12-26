<template>
  <div class="box">
    <header>
      <img class="bei" src="../assets/img/bei5.png" alt />
      <img class="login" src="../assets/img/login5.png" alt />
    </header>
    <section>
      <ul>
        <li>
          <input v-model="form.mobile" type="text" placeholder="手机号" />
        </li>
        <li>
          <input v-model="form.passwordOne" type="password" placeholder="密码" />
        </li>
        <li>
          <input v-model="form.passwordTow" type="password" placeholder="再次确认密码" />
        </li>
        <li>
          <input v-model="form.password" type="text" placeholder="短信验证码" />
          <span @click="sion" v-if="isSion">{{text}}</span>
          <span v-else>获取验证码({{num}})</span>
        </li>
      </ul>
      <div class="text">
        <input class="checkbox" type="checkbox" v-model="isChecked" />
        <span style="flex:1;color:#999;" @click="showText">
          注册即同意
          <span style="color:#238ACB;">《用户协议》</span>
        </span>
        <span style="color:#999;">
          已有账号?
          <span style="color:#238ACB;" @click="goLogin">立即登陆</span>
        </span>
      </div>
      <div class="btn" @click="login">
        <span>注册</span>
        <img src="../assets/img/login4.png" alt />
      </div>
    </section>
    <van-overlay :show="isModel">
      <div class="block">
        <p class="colse" @click="close">×</p>
        <scroller ref="my_scroller">
          <h3>第一条【完全了解】</h3>
          <br />请您（以下亦称“用户”）仔细阅读本协议全部条款，并确认您已完全了解本协议之规定。
          <br />未成年人应当在监护人陪同和指导下阅读本协议，并在使用本协议项下服务前取得监护人的同意。
          <br />请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则请您立即停止注册操作或立即停止使用本协议所涉服务。您的注册、登录、使用“全品学堂”服务，购买“全品学堂”产品等行为将视为对本协议的接受，并同意接受本协议各项条款的约束，“全品学堂”由武汉全品教育科技有限公司北京分公司负责运营。本协议将构成您与武汉全品教育科技有限公司北京分公司（以下简称“全品学堂”）之间直接有约束力的法律文件。
          <h3>第二条【充分授权】</h3>
          <br />请确认您依照中华人民共和国法律（为本协议之目的，含行政法规、部门规章、规范性文件，下同）、及您所在地之法律、及您自愿或应当接收其管辖之法律（以下合称“法律”），有权签署并同意接受本协议的约束。如果您代表您的雇主或单位，请在签署前，确认并保证您已获得签署本协议的充分授权。
          <h3>第三条 【协议变更】</h3>
          <br />本协议如果变更，“全品学堂”将尽可能提前在“全品学堂”服务平台发布通知。但您应了解并同意，“全品学堂”有可能未经事先通知，而修改或变更本协议的全部或部分内容，您也应随时关注本协议是否有修改或变更之情形。 如果本协议修改或变更，而您不能接受修改或变更后的内容，您可以停止使用“全品学堂”。如果您继续使用“全品学堂”，则表明您完全接受并愿意遵守修改或变更后的本协议。
          <h3>第四条 【服务方式】</h3>
          <br />1. “全品学堂”服务是由武汉全品教育科技有限公司北京分公司通过"全品学堂"网站、微信公众号、移动APP向用户提供的网络在线教育技术支持服务。
          <br />
          <br />2. 用户同意向“全品学堂”支付购买平台产品套餐费用，平台服务费以及发生退费时的手续费，具体费用标准以“全品学堂”网站届时公布的费率确定。除此之外的与相关网络服务有关的设备（如电脑、调制解调器、手机、平板电脑及其他与接入互联网有关的装置）及所需费用（如为接入互联网而支付的电话费及上网费），均由用户自己负担。用户认可平台产品套餐费、服务费、退费手续费在“全品学堂”网站进行公示的方式和公示所展示内容的真实性和准确性。
          <h3>第五条【善意使用】</h3>
          <br />您同意，遵守法律及本协议规定，秉承善意使用“全品学堂”，且保证：
          <br />
          <br />1. 不会利用“全品学堂”进行非法活动、或进行侵犯他人权利或损害他人利益的活动；不会以非法方式获取或利用“全品学堂”其他用户的信息。
          <br />
          <br />2. 不会以技术方式攻击或破坏或改变“全品学堂”的部分或全部、或干扰其运行；不会以非法方式获取或使用“全品学堂”的任何软件、代码或其他技术或商业信息；不会对“全品学堂”运行的任何程序进行反向工程、反向编译、反向汇编或改写。
          <br />
          <br />3. 不会未经许可使用或向任何第三方提供“全品学堂”的网站名称、公司名称、商标、商业标识、网页版式或内容、或其他由武汉全品教育科技有限公司北京分公司（及关联方）或“全品学堂”享有知识产权或权利的信息或资料；不会侵犯武汉全品教育科技有限公司北京分公司或“全品学堂”的商标权、著作权、专利权、其他知识产权或其他合法权利或权益。不会以任何方式贬损“全品学堂”的商业声誉。
          <br />
          <br />4. 不会利用“全品学堂”进行其他违背公序良俗的活动。
          <br />
          <br />您使用“全品学堂”的记录，可能被保存作为对您不利的证据。“全品学堂”也可能将您违反法律或侵犯第三方权利或权益的记录报告给行政主管部门、司法机关。
          <h3>第六条 【注册账号】</h3>
          <br />在使用“全品学堂”服务前，用户必须先在全品学堂平台上完成注册。用户必须完全同意全部用户条款并完成注册程序。
          您同意并承诺：
          (1)不故意冒用他人信息为您注册帐号；
          <br />
          <br />(2)不未经他人合法授权以他人名义注册帐号；
          <br />
          <br />(3)不使用色情、暴力或侮辱、诽谤他人等违反公序良俗的词语注册帐号。
          <br />
          <br />如您违反前述规定，“全品学堂”有权随时拒绝您使用该账号，或者限制您使用，或者注销该账号。
          <h3>第七条 【账号使用】</h3>
          <br />在您完成账号注册后，您应自行使用该账号，并对任何人利用您的帐号及密码所进行的活动负完全的责任。
          <br />
          <br />您应了解，在账号和密码匹配时，“全品学堂”无法对非法或未经您授权使用您帐号及密码的行为作出甄别，因此，“全品学堂”对任何使用您账号和密码登录并使用“全品学堂”的行为不承担任何责任。
          <br />
          <br />您同意并承诺：
          <br />
          <br />(1)当您的帐号或密码遭到未获授权的使用，或者发生其他任何安全问题时，您会立即有效通知到“全品学堂”；
          <br />
          <br />(2)当您每次上网或使用其他服务完毕后，会将有关帐号等安全退出； “全品学堂”有权根据自己的判定，在怀疑账号被不当使用时，拒绝账号使用或限制账号使用或注销该账号。
          <h3>第八条 【用户委托授权】</h3>
          <br />用户在此不可撤销地授权：授权委托“全品学堂”或“全品学堂”指定的第三方机构从其方账户中扣划套餐费、平台服务费、退款手续费等服务所涉及的款项，同时用户授权委托以下具体情形包括但不限于:
          <br />
          <br />(1)用户委托“全品学堂”进行用户匹配和老师用户上课时间匹配。
          <br />
          <br />(2)用户原创作品上载、传送、输入或以其他方式提供至“全品学堂”服务平台时，视为用户授予“全品学堂”对其作品的使用权，该授权无地域、期限、方式限制，该授权为免费授权，“全品学堂”可在现行法律范围内就该作品进行使用，包括但不限于复制、发行、出租、展览、表演、放映、广播、信息网络传播、摄制、改编、翻译、汇编等，并可将前述权利转、分授权给其他第三方，以及允许第三方免费或付费下载。
          <br />
          <br />(4)其他用户委托或授权事项。
          <br />
          <br />用户认可对“全品学堂”进行上述授权，作为用户的全权代表，并同意承担由此产生的全部法律责任。
          <h3>第九条 【除外责任】</h3>
          <br />在任何情况下，对于用户使用“全品学堂”服务过程中涉及由第三方提供相关服务的责任由该第三方承担，“全品学堂”不承担该等责任。“全品学堂”不承担责任的情形包括但不限于：
          <br />
          <br />(1)因银行、第三方支付机构等第三方未按照用户和/或“全品学堂”指令进行操作引起的任何损失或责任；
          <br />
          <br />(2)因银行、第三方支付机构等第三方原因导致资金未能及时到账或未能到账引起的任何损失或责任；
          <br />
          <br />(3)因银行、第三方支付机构等第三方对交易限额或次数等方面的限制而引起的任何损失或责任；
          <br />
          <br />(4)因其他第三方的行为或原因导致的任何损失或责任。
          <br />
          <br />因用户自身的原因导致的任何损失或责任，由用户自行负责，“全品学堂”不承担责任。“全品学堂”不承担责任的情形包括但不限于：
          <br />
          <br />(1)因用户使用的银行卡的原因导致的损失或责任，包括用户使用未经认证的银行卡或使用非用户本人的银行卡或使用信用卡，用户的银行卡被冻结、挂失等导致的任何损失或责任；
          <br />
          <br />(2)用户向“全品学堂”发送的指令信息不明确、或存在歧义、不完整等导致的任何损失或责任；
          <br />
          <br />(3)用户账户内余额不足导致的任何损失或责任；
          <br />
          <br />(4)用户下载非法或不明程序所导致的损失；
          <br />
          <br />对于“全品学堂”向用户免费提供的各项网络服务、向用户赠送的任何产品或者服务的质量缺陷本身及其引发的任何损失及责任。
          <br />
          <br />其他因用户或其他用户原因导致的任何损失或责任。
          <h3>第十条【风险提示】</h3>
          <br />用户了解并认可，任何通过“全品学堂”进行的交易并不能避免以下风险的产生，“全品学堂”不能也没有义务为如下风险负责或承担任何责任：
          <br />
          <br />(1)政策风险：有关法律、法规及相关政策、规则发生变化，可能引起价格等方面异常波动，用户有可能遭受损失。
          <br />
          <br />(2)不可抗力因素导致的风险。
          <br />
          <br />(3)因用户的过错导致的任何损失，该过错包括但不限于：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失。
          <br />
          <br />(4)“全品学堂”不对任何用户及/或任何交易提供任何担保或条件，无论是明示、默示或法定的。“全品学堂”不能也不试图对用户发布的信息进行控制，对该等信息，“全品学堂”不承担任何形式的证明、鉴定服务。“全品学堂”不能完全保证平台披露内容的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。用户依赖于用户的独立判断进行决策，用户应对其作出的判断承担全部责任。
          <br />
          <br />(5)“全品学堂”不对学习效果提供任何承诺或担保。
          <br />
          <br />以上并不能揭示用户通过“全品学堂”进行学习行为的全部风险及市场的全部情形。用户在做出决策前，应全面了解相关服务，谨慎决策，并自行承担全部风险。
          <h3>第十一条 【服务终端或故障】</h3>
          <br />“全品学堂”尽可能保证其稳定运行。
          <br />
          <br />您应理解并同意，因法律、政策、技术、经济、管理的原因，除非和您另有约定，“全品学堂”不会因以下情形出现而对您承担责任：
          <br />
          <br />(1)“全品学堂”无法使用或中断使用或无法完全适合用户的使用要求。
          <br />
          <br />(2)“全品学堂”受到干扰，无法及时、安全、可靠运行，或出现任何错误。
          <br />
          <br />(3)经由“全品学堂”取得的任何产品、服务（含收费服务）或其他材料不符合您的期望。
          <br />
          <br />“全品学堂”享有提前90日在“全品学堂”服务平台以公告通知的方式中断或终止部分或全部网络服务的权利。若“全品学堂”终止部分或全部网络服务导致用户剩余产品余额使用受限或无法使用剩余产品金额，用户在此明确表示，无条件同意并接受“全品学堂”对其剩余产品余额的处理（包括但不限于限定用户在规定时间内使用完剩余产品金额、在“全品学堂”提供的其他产品或服务上使用剩余产品金额、经“全品学堂”合作的第三方产品运营公司同意，在该等合作第三方提供的产品或服务中使用剩余产品余额或按用户购买时的比例、以法定货币退还用户剩余产品余额等）。
          <h3>第十二条 【隐私政策】</h3>
          <br />1. “全品学堂“收集信息的范围
          <br />
          <br />“全品学堂”根据合法、正当、必要的原则，仅收集实现产品功能所必要的信息。
          <br />
          <br />(1)用户在使用我们服务时主动提供的信息
          <br />
          <br />A. 用户在使用我们服务时主动提供的信息。
          <br />
          <br />B. 用户在使用服务时上传的信息。
          <br />
          <br />例如，用户在使用“全品学堂”账户时，上传的头像、资料。我们的部分服务可能需要用户提供特定的个人敏感信息来实现特定功能。若用户选择不提供该类信息，则可能无法正常使用服务中的特定功能，但不影响用户使用服务中的其他功能。若用户主动提供个人敏感信息，即表示用户同意我们按本政策所述目的和方式来处理用户的个人敏感信息（个人敏感信息是指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。例如，个人敏感信息包括身份证件号码、个人生物识别信息、银行账号、通信内容、生理健康信息等）。
          <br />
          <br />(2)我们在用户使用服务时获取的信息。
          <br />
          <br />A. 日志信息。当用户使用我们的服务时，我们可能会自动收集相关信息并存储为服务日志信息。
          <br />
          <br />B. 软件信息。例如，软件的版本号。为确保操作环境的安全或提供服务所需，我们会收集有关用户使用的移动应用和其他软件的信息。
          <br />
          <br />C. IP地址。
          <br />
          <br />D. 服务日志信息。例如，用户在使用我们服务时搜索、查看的信息、服务故障信息、引荐网址等信息。
          <br />
          <br />2. “全品学堂“收集信息的用途
          <br />
          <br />(1) 向用户提供服务。
          <br />
          <br />(2) 满足用户的个性化需求。例如编辑个人资料的头像服务。
          <br />
          <br />(3) 产品开发和服务优化。例如当我们的系统发生故障时，我们会记录和分析系统故障时产生的信息，优化我们的服务。
          <br />
          <br />(4) 安全保障。例如，我们会将用户的信息用于身份验证、安全防范、反诈骗监测、存档备份、客户的安全服务等用途。
          <br />
          <br />(5) 管理软件。例如，进行软件升级等。
          <br />
          <br />(6) 为了确保服务的安全，帮助我们更好地了解我们应用程序的运行情况，我们可能记录相关信息，例如，用户使用应用程序的频率、故障信息、总体使用情况、性能数据以及应用程序的来源。我们不会将我们存储在分析软件中的信息与用户在应用程序中提供的个人身份信息相结合。
          <br />
          <br />3. 用户如何管理自己的信息
          <br />
          <br />未经用户许可“全品学堂”不得向任何第三方提供、公开或共享用户注册资料中的姓名、个人有效身份证件号码、联系方式、家庭住址等个人身份信息，但下列情况除外：
          <br />
          <br />(1)用户可以在使用我们服务的过程中，访问、修改自己提供的注册信息和其他个人信息，也可按照通知指引与我们联系。您访问、修改个人信息的范围和方式将取决于您使用的具体服务。
          <br />
          <br />(2)我们将按照本政策所述，仅为实现我们产品或服务的功能，收集、使用用户的信息。如您发现我们违反法律、行政法规的规定或者双方的约定收集、使用您的个人信息，您可以要求我们删除。如您发现我们收集、存储的您的个人信息有错误的，您也可以要求我们更正。
          <br />
          <br />(3)在用户访问、修改和删除相关信息时，我们可能会要求用户进行身份验证，以保障帐号的安全。
          <br />
          <br />(4)请您理解，由于技术所限、法律或监管要求，我们可能无法满足您的所有要求，我们会在合理的期限内答复您的请求。
          <br />
          <br />(5)披露和共享用户的个人信息：
          <br />
          <br />(1)我们可能基于以下目的披露您的个人信息：
          <br />
          <br />A. 遵守适用的法律法规等有关规定。
          <br />
          <br />B. 遵守法院判决、裁定或其他法律程序的规定。
          <br />
          <br />C. 遵守相关政府机关或其他法定授权组织的要求。
          <br />
          <br />D. 我们有理由确信需要遵守法律法规等有关规定。
          <br />
          <br />E. 为执行相关服务协议或本政策、维护社会公共利益，为保护我们的客户、我们或我们的关联公司、其他用户或雇员的人身财产安全或其他合法权益合理且必要的用途。
          <br />
          <br />(2)共享用户个人信息：
          <br />
          <br />A. 在获得您的同意后，我们会与其他方共享您的个人信息。我们可能会根据法律法规规定，或按政府主管部门的强制性要求或司法裁定，对外共享您的个人信息。
          <br />
          <br />B. 我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享与提供服务相关的个人信息。我们的合作伙伴无权将共享的个人信息用于任何其他用途。
          <br />
          <br />C. 对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。
          <br />
          <br />(6)遵从“全品学堂”的产品服务程序而披露的；
          <br />
          <br />(7)为维护社会公众的利益而披露的。
          <br />
          <br />6. 存储信息的地点和期限
          <br />
          <br />(1)存储信息的地点
          <br />
          <br />我们遵守法律法规的规定，将境内收集的用户个人信息存储于境内。
          <br />
          <br />(2)存储信息的期限
          <br />
          <br />一般而言，我们仅为实现目的所必需的最短时间保留用户的个人信息。但在下列情况下，我们有可能因需符合法律要求，更改个人信息的存储时间：
          <br />
          <br />A. 为遵守适用的法律法规等有关规定。
          <br />
          <br />B. 为遵守法院判决、裁定或其他法律程序的规定。
          <br />
          <br />C. 为遵守相关政府机关或法定授权组织的要求。
          <br />
          <br />D. 我们有理由确信需要遵守法律法规等有关规定。
          <br />
          <br />E. 为执行相关服务协议或本政策、维护社会公共利益，为保护我们的客户、我们或我们的关联公司、其他用户或雇员的人身财产安全或其他合法权益所合理必需的用途。当我们的产品或服务发生停止运营的情形时，我们将采取例如，推送通知、公告等形式通知用户，并在合理的期限内主动或根据用户请求删除或匿名化处理用户的个人信息。
          <br />
          <br />7. 信息安全
          <br />
          <br />我们为用户的信息提供相应的安全保障，以防止信息的丢失、不当使用、未经授权访问或披露。
          <br />
          <br />(1)我们严格遵守法律法规保护用户的通信秘密。
          <br />
          <br />(2)我们将在合理的安全水平内使用各种安全保护措施以保障信息的安全。例如，我们使用加密技术（例如，TLS、SSL）、匿名化处理等手段来保护您的个人信息。
          <br />
          <br />(3)我们将建立专门的管理制度、流程和组织确保信息安全。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务，并进行审查。
          <br />
          <br />(4)若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并以推送通知、公告等形式告知用户。
          <br />
          <br />8. 未成年人保护
          <br />
          <br />我们非常重视对未成年人个人信息的保护。根据相关法律法规的规定，若您是18周岁以下的未成年人，在使用全品学堂的服务前，应事先取得您的家长或法定监护人的同意。“全品学堂”为18岁以下的儿童及其家长或监护人提供服务时，用户为家长或监护人。家长或监护人对通过选择“全品学堂”提供的产品和服务负有完全的责任。
          <br />
          <br />9. 变更
          <br />
          <br />我们可能适时修订本政策内容。如该等变更会导致您在本政策项下权利的实质减损，我们将在变更生效前，通过在页面显著位置提示等方式通知您。在该种情况下，若您继续使用我们的服务，即表示同意受经修订的政策约束。
          <h3>第十三条 【法律适用】</h3>
          <br />您在使用“全品学堂”时，应遵守中华人民共和国法律、及您所在地之法律、及您自愿或应当接收其管辖之法律。
          <br />
          <br />本协议的解释及履行应按照中华人民共和国法律进行。
          <h3>第十四条 【法律责任】</h3>
          <br />您应就所上传的内容承担全部法律责任；无论前述责任是因侵犯第三方权利所引起的、或因您违反与第三方或本协议引起的、或因您违反法律引起的；前述责任包括对“全品学堂”或第三方所承担的民事责任、或行政机关要求承担的行政责任或刑事责任。
          <br />
          <br />您同意，如因您违反法律规定或本协议规定给“全品学堂”造成损失，您将充分赔偿“全品学堂”所遭受的损失、包括其直接损失、间接损失、预期利益损失等一切损失。
          <br />
          <br />您承诺，如因第三方向您主张权利而导致您承担民事责任，或您承担行政责任或刑事责任的，您不以此为理由追究“全品学堂”的责任。
          <br />
          <br />如您应向“全品学堂”承担责任，前述责任不因本协议或本协议项下的服务被终止而免除。
          <h3>第十五条 【相关协议】</h3>
          <br />“全品学堂”可能不时发布针对用户的相关协议，并可能将该相关协议作为对本协议的补充或修改而将其内容作为本协议的一部分。请您及时关注并阅读相关协议。
          <h3>第十六条 【争议解决】</h3>
          <br />您和“全品学堂”均同意，因本协议解释或执行引起的任何争议，双方应首先友好协商解决。协商不成时，则任一方均可将争议提交北京仲裁委员会依据其届时有效的仲裁规则以仲裁方式解决。仲裁地点为北京，仲裁语言为中文。仲裁裁决为终局的，对各方均有法律约束力。
          <br />
          <br />请您再次确认您已全部阅读并充分理解上述协议。
        </scroller>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import axios from "axios";
import storage from "../uilt/storage";
import { SEND, SIGNIN, SIGNINS } from "../uilt/url";
import { mapMutations } from "vuex";
export default {
  mounted() {
    let href = window.location.href;
    this.location = href.split("=")[1];
    if (this.$route.params.mobile) {
      this.form = this.$route.params;
    }
  },
  data() {
    return {
      location: "",
      isChecked: true,
      isModel: false,
      isSion: true,
      text: "发送验证码",
      num: 100,
      form: {
        password: "",
        passwordOne: "",
        passwordTow: "",
        mobile: ""
      },
      myreg: /^[1][3,4,5,7,8,6,9][0-9]{9}$/
    };
  },
  methods: {
    ...mapMutations(["steGiweStatus"]),
    goLogin() {
      this.$router.push("/login");
    },
    //关闭协议
    close() {
      this.isModel = false;
    },
    showText() {
      this.isModel = true;
    },
    //发送验证码
    sendCode() {
      axios({
        method: "post",
        url: SEND,
        data: {
          mobile: this.form.mobile
        }
      })
        .then(res => {
          if (res.data.error) {
            this.$notify({ type: "warning", message: res.data.error });
          }
          if (res.data.code == 200 && res.data.ret == true) {
            this.$notify({ type: "success", message: "验证码已发送" });
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    //登录
    Login() {
      if (!this.form.mobile) {
        this.$notify({ type: "warning", message: "手机号不能为空" });
        return;
      }
      if (!this.myreg.test(this.form.mobile)) {
        this.$notify({ type: "warning", message: "手机号有误" });
        return;
      }
      if (!this.form.password) {
        this.$notify({ type: "warning", message: "验证码不能为空" });
        return;
      }
      if (!this.isChecked) {
        this.$notify({ type: "warning", message: "请认真阅读协议" });
        return;
      }
      axios({
        method: "post",
        url: SIGNINS,
        data: {
          mobile: this.form.mobile,
          password: this.form.password,
          mobile_password: this.form.passwordTow,
          promoter_id: this.location ? this.location : ""
        }
      })
        .then(res => {
          if (res.data.error) {
            this.$notify({ type: "warning", message: res.data.error });
            return;
          }
          if (res.data.ret) {
						this.$notify({ type: "success", message: "注册成功！" });
						this.$router.push('/login')
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    login() {
      this.Login();
    },
    sion() {
      if (!this.form.mobile || !this.myreg.test(this.form.mobile)) {
        this.$notify({ type: "warning", message: "请填写正确的手机号码" });
        return;
      } else if (!this.form.passwordOne || !this.form.passwordTow) {
        this.$notify({ type: "warning", message: "密码不能为空" });
        return;
      } else if (this.form.passwordOne != this.form.passwordTow) {
        this.$notify({ type: "warning", message: "两次密码不同" });
        return;
      } else if (this.checkPwd(this.form.passwordOne) == "no") {
        return;
      }
      axios({
        method: "post",
        url: SIGNIN,
        data: {
          mobile: this.form.mobile
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.ret) {
            this.$notify({
              type: "warning",
              message: "您已注册，请直接登陆"
            });
            return;
          } else {
            this.sendCode();
            this.isSion = false;
            if (!this.isSion) {
              --this.num;
              let set = window.setInterval(() => {
                if (this.num-- <= 1) {
                  this.num = 100;
                  window.clearInterval(set);
                  this.isSion = true;
                }
              }, 1000);
            }
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    //校验密码
    checkPwd(str) {
      var patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
      var pattern4 = /\s+/g;
      if (pattern4.exec(str)) {
        this.$notify({
          type: "warning",
          message: "不能有空格、换行、tab缩进等所有的空白"
        });
        return "no";
      }
      if (patrn.test(str)) {
        this.$notify({ type: "warning", message: "不可用特殊字符" });
        return "no";
      } else {
        if (str.length < 6) {
          this.$notify({ type: "warning", message: "密码不能小于6位" });
          return "no";
        }
        if (!str) {
          this.$notify({ type: "warning", message: "密码不能为空" });
          return "no";
        }
      }
      return "ok";
    }
  }
};
</script>

<style scoped>
.text .node {
  color: #238acb;
  font-size: 24px;
}
header .bei {
  margin-top: -340px;
  width: 100%;
  position: relative;
}
._v-container > ._v-content > .pull-to-refresh-layer {
  width: 100%;
  height: 120px;
  margin-top: -120px;
  text-align: center;
  font-size: 32px;
  color: #aaa;
  float: left;
  top: 0;
  left: 0;
}
.colse {
  font-size: 50px;
  position: fixed;
  top: 1.7rem;
  right: 1.1rem;
  z-index: 99999;
}
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
.block {
  position: relative;
  height: 14rem;
  width: 100%;
  background: #fff;
  margin: 60px 80px;
}
section > div.text > span {
  font-size: 24px;
}
section > div.text > input.checkbox {
  width: 30px;
  height: 32px;
  margin-top: 4px;
}
section > div.text {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px 0;
  width: 548px;
}
section > div.btn > span {
  position: absolute;
  font-size: 30px;
  color: #fff;
}
section > div.btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
section > ul {
  margin-top: 40px;
}
ul li > span {
  position: absolute;
  right: 0;
  color: #238acb;
  padding-top: 0px;
  display: inline-block;
  height: 100%;
  line-height: 120px;
  top: -20px;
  font-size: 28px;
}
ul li:last-child {
  position: relative;
}
ul li {
  width: 548px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
input {
  border: none;
  outline: none;
  font-size: 28px;
  width: 100%;
  border-bottom: 1px solid #bfbfbf;
}
input::-webkit-input-placeholder {
  color: #666;
}
section {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff;
}
header img.login {
  left: 0;
  top: 44px;
  width: 100%;
  position: absolute;
  transform: scale(0.45);
}
header {
  height: 9.826667rem;
  overflow: hidden;
  /* position: relative; */
  width: 100%;
}
.box {
  display: flex;
  flex-direction: column;
}
</style>