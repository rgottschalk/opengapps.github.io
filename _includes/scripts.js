var archs=['arm','arm64','x86','x86_64'];var apis=['4.4','5.0','5.1','6.0'];var variants=['aroma','super','stock','full','mini','micro','nano','pico'];var packages={};
Array.prototype.has=function has(o){return this.indexOf(o)!==-1;};Object.prototype.each=function each(key,cb){for(var i in this){if(this.hasOwnProperty(i)){if(!!this[i][key]){cb(this[i]);}}}};
function getUrlParam(param){var vars=window.location.search.substring(1).split('&');for(var i=0;i<vars.length;i++){var parts=vars[i].split('=');if(parts[0]===param){var part=parts[1]||'';if(part.substr(part.length-1,1)==='/'){part=part.substr(0,part.length-1);}return part;}}return null;}
var storage=window.localStorage;try{storage.setItem('__test_key','__test_val');if(storage.getItem('__test_key')!=='__test_val'){throw 'getItem test failed';}storage.removeItem('__test_key');}catch(e){storage={getItem:function(){return null;},setItem:function(){},removeItem:function(){},};}
var arch=getUrlParam('arch');var autoAllowArch=archs.has(arch);if(!autoAllowArch){arch=storage.getItem('arch')||'arm';}document.getElementById(arch).checked=true;
var api=getUrlParam('api');var autoAllowApi=apis.has(api);if(!autoAllowApi){api=storage.getItem('api')||'6.0';}document.getElementById(api).checked=true;
var variant=getUrlParam('variant');var autoAllowVariant=variants.has(variant);if(!autoAllowVariant){variant=storage.getItem('variant')||'stock';}document.getElementById(variant).checked=true;
var download=getUrlParam('download')==='true';var autoDownload=download&&autoAllowArch&&autoAllowApi&&autoAllowVariant;if(download&&!autoDownload){alert('Automatic download requested but refused: Unexpected value for '+[autoAllowArch?null:'arch',autoAllowApi?null:'api',autoAllowVariant?null:'variant'].filter(function(o){return o!==null;}).join(' & ')+'.');}
function getCookie(key){key+='=';var cs=document.cookie.split(';');for(var i=0;i<cs.length;i++){var c=cs[i].trim();if(c.substr(0,key.length)===key){return c.substr(key.length).trim();}}return '';}
function setCookie(key,value,days){var d=new Date();d.setTime(d.getTime()+(days*24*60*60*1000));document.cookie=key+"="+value+"; expires="+d.toUTCString();}
function gaEvent(eventCategory,eventAction,eventLabel,cb,timeoutMillis){var acted=false;var act=function(){if(acted){return;}(cb||function(){})();acted=true;};try{ga('send','event',eventCategory,eventAction,eventLabel,{hitCallback:act});setTimeout(act,timeoutMillis||1);}catch(e){act();}}
function redirectToFile(eventCategory,eventLabel,filename){gaEvent(eventCategory,'download',eventLabel,function(){location.assign('https://github.com/opengapps/'+arch+'/releases/download/'+packages[arch].dateTag+'/'+filename);},1000);}
function downloadSubmit(){var v=validateForm();if(v==='ok'){redirectToFile('GApps',arch+'-'+api+'-'+variant,'open_gapps-'+arch+'-'+api+'-'+variant+'-'+packages[arch].dateTag+'.zip');}}
function md5Submit(){var v=validateForm();if(v==='ok'){redirectToFile('MD5',arch+'-'+api+'-'+variant,'open_gapps-'+arch+'-'+api+'-'+variant+'-'+packages[arch].dateTag+'.zip.md5');}}
function versionSubmit(){var v=validateForm();if(v==='variant'||v==='ok'){redirectToFile('Version',arch+'-'+api,'versions-'+arch+'-'+api+'-'+packages[arch].dateTag+'.txt');}}
function olderSubmit(){var v=validateForm();if(v==='api'||v==='variant'||v==='ok'){var targetUrl='https://github.com/opengapps/'+arch+'/releases/';gaEvent('outbound','click',targetUrl,function(){location.assign(targetUrl);},1000);}}
function setButtonEnable(id,enable){var el=document.getElementById(id);if(typeof el.MaterialButton==='object'){el.MaterialButton[(!!enable)?'enable':'disable']();}}
function setBoxEnable(id,enable){var el=document.getElementById(id).parentElement;if(typeof el.MaterialRadio==='object'){el.MaterialRadio[(!!enable)?'enable':'disable']();}}
function setBoxCheck(id,check){var el=document.getElementById(id).parentElement;if(typeof el.MaterialRadio==='object'){el.MaterialRadio[!!check?'check':'uncheck']();}}
function setAd(el,content,label){el.style.cssText='display:block !important';el.innerHTML=content;gaEvent('Ads','display',label);}
var extraAds=[];extraAds.push({name:'SEFileExplorer',titleText:'Download Solid Explorer to copy Open GApps to your mobile device',altText:'Download Solid Explorer',imgName:'se',targetUrl:'https://play.google.com/store/apps/details?id=pl.solidexplorer2&referrer=utm_source%3Dopengapps%26utm_medium%3Dbanner'});
function validateAds(){var ads=document.getElementsByClassName('adsbygoogle');var donateTextOnFirst=Math.random()<0.5;var donateTextElement=ads[donateTextOnFirst?0:1];var fallbackAdElement=ads[donateTextOnFirst?1:0];if(!donateTextElement||!fallbackAdElement){setTimeout(validateAds,500);return;}if(donateTextElement.innerHTML.trim().length===0){setAd(donateTextElement.parentElement,'<div id="donatebox"><div id="donatetitle" class="mdl-typography--display-1"><a href="#" onclick="$(\'#paypal\',parent.document).submit();return false;" title="The project is supported by donations and advertisements">Please Donate!</a></div><br /><div id="donatebody" class="mdl-typography--body-1">You blocked the advertisements, that is OK. But please consider a <a href="#" onclick="$(\'#paypal\',parent.document).submit();return false;">donation</a> to the project instead!</div><div id="donatespace"><br /></div><a href="#" onclick="$(\'#paypal\',parent.document).submit();return false;"><div id="donaterectangle"><i class="material-icons" style="color:#f5f5f5">card_giftcard</i></div></a><br /><div id="donatecaption" class="mdl-typography--caption-color-contrast">The advertisement revenue supports the projects\' efforts. Can\'t donate? <a href="abp:subscribe?location=http%3A%2F%2Fopengapps.org%2Fopengapps.org.abp.txt&amp;title=Open%20GApps" title="Add opengapps.org to your Adblocker\'s whitelist">Please unblock our ads!</a></div></div>','Donate');}else{gaEvent('Ads','display','AdSense'+(donateTextOnFirst?'Header':'Footer'));}if(fallbackAdElement.innerHTML.trim().length===0){if(extraAds.length>0){var fallbackAd=extraAds[Math.floor(Math.random()*extraAds.length)];setAd(fallbackAdElement.parentElement,'<div id="extrabox"><a id="extralink" href="#" onclick="gaEvent(\'outbound\',\'click\',\''+fallbackAd.targetUrl+'\',function(){location.assign(\''+fallbackAd.targetUrl+'\');},1000);return false;"><img src="{{site.img}}'+fallbackAd.imgName+'.'+(fallbackAdElement.parentElement.id||'topa')+'.png" alt="'+fallbackAd.altText+'" title="'+fallbackAd.titleText+'" /></a></div>','Campaign'+fallbackAd.name);}else{gaEvent('Ads','display','NoCampaign');}}else{gaEvent('Ads','display','AdSense'+(donateTextOnFirst?'Footer':'Header'));}}
function validateForm(){var form=document.getElementById('DownloadForm');form.arch.each('checked',function(el){arch=el.value;});if(!archs.has(arch)||packages[arch]===undefined){return 'arch';}storage.setItem('arch',arch);form.api.each('checked',function(el){api=el.value;});if(!apis.has(api)||packages[arch].apis[api]===undefined){return 'api';}storage.setItem('api',api);form.variant.each('checked',function(el){variant=el.value;});if(!variants.has(variant)||packages[arch].apis[api][variant]===undefined){return 'variant';}storage.setItem('variant',variant);return 'ok';}
function updateButtons(){var v=validateForm();var ch=window.componentHandler;ch.upgradeDom();var info=document.getElementById('github-latest');if(v==='arch'){info.innerHTML='<div id="github-progressbar" class="mdl-progress mdl-js-progress mdl-progress__indeterminate progress-demo"></div><span class="mdl-typography--caption-color-contrast">querying GitHub API...</span>';}else if(v==='api'){info.innerHTML='<span class="mdl-typography--subhead-color-contrast">Select an Android version</span>';}else if(v==='variant'){info.innerHTML='<span class="mdl-typography--subhead-color-contrast">Select a variant</span>';}else{info.innerHTML='<span class="mdl-typography--headline">'+packages[arch].day+' '+packages[arch].month+' '+packages[arch].year+'</span><br><span class="mdl-typography--subhead">Size: '+packages[arch].apis[api][variant].size;}ch.upgradeDom();var hasApi=function(a){return v!=='arch'&&packages[arch].apis.hasOwnProperty(a);};for(var iApi=0;iApi<apis.length;iApi++){setBoxEnable(apis[iApi],hasApi(apis[iApi]));}setBoxCheck(api,hasApi(api));var hasVariant=function(a){return v!=='arch'&&v!=='api'&&packages[arch].apis[api].hasOwnProperty(a);};for(var iVariant=0;iVariant<variants.length;iVariant++){setBoxEnable(variants[iVariant],hasVariant(variants[iVariant]));}setBoxCheck(variant,hasVariant(variant));setButtonEnable('bdownload',v==='ok');setButtonEnable('bversion',v==='ok'||v==='variant');setButtonEnable('bmd5',v==='ok');setButtonEnable('bolder',v==='ok'||v==='variant'||v==='api');}
function queryRelease(){document.getElementById('DownloadForm').arch.each('checked',function(el){arch=el.value;});storage.setItem('arch',arch);delete packages[arch];updateButtons();var httpRequest=new XMLHttpRequest();httpRequest.onreadystatechange=function(){if(httpRequest.readyState===XMLHttpRequest.DONE&&httpRequest.status===200){var data=JSON.parse(httpRequest.responseText);var releaseName=data.name.split(' ');packages[releaseName.shift()]={'apis':{},'dateTag':data.tag_name,'year':releaseName.pop(),'month':releaseName.pop(),'day':releaseName.pop()};for(var i=0;i<data.assets.length;i++){var asset=data.assets[i];if(asset.name.substr(asset.name.length-4,4)!=='.zip'){continue;}var assetName=asset.name.split('-');if(packages[assetName[1]].apis[assetName[2]]===undefined){packages[assetName[1]].apis[assetName[2]]={};}packages[assetName[1]].apis[assetName[2]][assetName[3]]={'size':Math.round(asset.size/1024/1024*100)/100+' MiB'};}updateButtons();if(autoDownload){downloadSubmit();autoDownload=false;}}};httpRequest.open('GET','https://api.github.com/repos/opengapps/'+arch+'/releases/latest');try{httpRequest.send();}catch(e){}}
document.addEventListener('DOMContentLoaded',function(){(function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments);};i[r].l=1*new Date();a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','UA-63785067-1','auto');ga('send','pageview','/');window.componentHandler.upgradeDom();for(var iAd=0;iAd<document.getElementsByClassName('adsbygoogle').length;iAd++){try{(window.adsbygoogle||[]).push({});}catch(e){validateAds();break;}}if(getCookie('c')!=='y'){window.componentHandler.upgradeDom();var snackbar=document.getElementsByClassName('mdl-js-snackbar')[0].MaterialSnackbar;snackbar.showSnackbar({message:'We use cookies to share information about your use of our site with our advertising and analytics partner',actionHandler:function(){setCookie('c','y',365);snackbar.cleanup_();},actionText:'Got it!',timeout:60000});}document.getElementById('bversion').addEventListener('click',versionSubmit);document.getElementById('bmd5').addEventListener('click',md5Submit);document.getElementById('bolder').addEventListener('click',olderSubmit);var inputs=document.getElementsByTagName('input');for(var iInput=0;iInput<inputs.length;iInput++){var input=inputs[iInput];switch(input.name){case 'arch':input.addEventListener('change',queryRelease);break;case 'api':case 'variant':input.addEventListener('change',updateButtons);break;}}queryRelease();setTimeout(validateAds,2500);});
