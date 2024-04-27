function L(){if($(".charts").length===0)return;let t="countryName";w(t),N(t)}function N(t="countryName"){const n=document.getElementById("myChart2");if(n===null)return;let i=$("#columns-list2"),e=$("#pages-list2"),a=$("#years-list2"),l=$("#perpage-list2"),s={columnSelected:t,pagesList:e,visitsChart:null,ctx:n,page:1,yearSelected:moment().year()};b(s),i.on("change",function(){s.columnSelected=i.val(),s.page=1,s.yearSelected=a.val(),b(s)}),a.on("change",function(){s.columnSelected=i.val(),s.page=1,s.yearSelected=a.val(),b(s)}),e.on("change",function(){s.columnSelected=i.val(),s.page=e.val(),s.yearSelected=a.val(),b(s)}),l.on("change",function(){s.columnSelected=i.val(),s.page=1,s.yearSelected=a.val(),s.perPage=l.val(),b(s)})}function b(t){$.ajax({type:"POST",url:`/api/stats?page=${t.page}`,data:{table:"visitors",column:t.columnSelected,year:t.yearSelected,perPage:t.perPage},success:function(n){if(t.page===1){let a="";for(let l=1;l<=n.last_page;l++)a+=`<option value="${l}">Page ${l}</option>`;t.pagesList.html(a)}let i=[];if(n.data.length===0)i.push({label:"NO DATA FOUND",data:null,borderWidth:1});else{let a=Object.groupBy(n.data,l=>l[t.columnSelected]);for(let l in a)if(a[l]){let o=[],r=[1,2,3,4,5,6,7,8,9,10,11,12];a[l].forEach(function(d){o[d.month-1]=d.visits,delete r[d.month-1]}),r.forEach(function(d,u){o[u]=0}),i.push({label:l,data:o,borderWidth:1})}}t.visitsChart&&t.visitsChart.destroy();let e=["January","February","March","April","May","June","July","August","September","October","November","December"];t.visitsChart=_({ctx:t.ctx,labels:e,datasets:i,title:`Visits of ${t.yearSelected}`})}})}function w(t="countryName"){const n=document.getElementById("myChart");n!==null&&$.ajax({type:"GET",url:"/api/visitors/columns",success:function(i){let e="";i.forEach(function(d,u){e+=`<option value="${d}" ${d===t?"selected":""}>${d}</option>`});let a=$("#columns-list"),l=$("#columns-list2"),s=$("#pages-list"),o=$("#perpage-list");a.html(e),l.html(e);let r={columnSelected:t,pagesList:s,visitsChart:null,ctx:n,page:1};v(r),a.on("change",function(){r.columnSelected=a.val(),r.page=1,v(r)}),s.on("change",function(){r.columnSelected=a.val(),r.page=s.val(),v(r)}),o.on("change",function(){r.columnSelected=a.val(),r.page=1,r.perPage=o.val(),v(r)})}})}function v(t){$.ajax({type:"POST",url:`/api/stats?page=${t.page}`,data:{table:"visitors",column:t.columnSelected,perPage:t.perPage},success:function(n){if(t.page===1){let l="";for(let s=1;s<=n.last_page;s++)l+=`<option value="${s}">Page ${s}</option>`;t.pagesList.html(l)}let i=n.data,e=i.map(l=>l[t.columnSelected]),a=i.map(l=>l.visits);t.visitsChart&&t.visitsChart.destroy(),t.visitsChart=_({ctx:t.ctx,title:`Visits by ${t.columnSelected}`,labels:e,datasets:[{label:`Visits nb by ${t.columnSelected}`,data:a,borderWidth:1}]})}})}function _(t){return new Chart(t.ctx,{type:"bar",data:{labels:t.labels,datasets:t.datasets},options:{responsive:t.responsive||!0,maintainAspectRatio:t.maintainAspectRatio||!1,plugins:{title:{display:!0,text:t.title},zoom:{zoom:{drag:{enabled:!0},wheel:{enabled:!0},pinch:{enabled:!0},mode:"x"}}}}})}function S(){if($("#post_body").length==0)return;let t={selector:"textarea#post_body",plugins:"searchreplace autolink visualblocks visualchars media charmap nonbreaking anchor insertdatetime advlist wordcount help emoticons autosave code link table lists codesample image preview pagebreak",toolbar:"code codesample link image pagebreak | undo redo restoredraft | bold italic underline | alignleft aligncenter alignright alignjustify lineheight indent outdent | bullist numlist",pagebreak_separator:"<hr/>",height:700,fixed_toolbar_container:".tox-editor-header",codesample_languages:[{text:"Bash",value:"bash"},{text:"Typscript",value:"typscript"},{text:"Markdown",value:"markdown"},{text:"Pug",value:"pug"},{text:"Sass",value:"sass"},{text:"Yaml",value:"yaml"},{text:"SQL",value:"sql"},{text:"HTML/XML",value:"markup"},{text:"CSS",value:"css"},{text:"JavaScript",value:"javascript"},{text:"PHP",value:"php"},{text:"Ruby",value:"ruby"},{text:"Python",value:"python"},{text:"Java",value:"java"},{text:"C",value:"c"},{text:"C#",value:"csharp"},{text:"C++",value:"cpp"}]};C("theme")==="dark-mode"&&(t={...t,skin:"oxide-dark",content_css:"dark"});let i=tinymce.get("post_body");if(i!=null){let e=i.getContent();i.destroy(),i.setContent(e)}tinymce.init(t)}function j(){$(".js-flatpickr").length!=0&&One.helpersOnLoad("js-flatpickr")}function I(){$(".js-select2").length!=0&&One.helpersOnLoad(["jq-select2"])}function O(){if($("#posts").length&&g({first_time:!0,id:"#posts",method:"POST",url:"/api/posts",columns:[{data:"id",name:"id",title:"Actions",className:"text-center",render:function(n,i,e,a){return`
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary js-bs-tooltip-enabled" data-bs-toggle="tooltip" aria-label="Edit Client" data-bs-original-title="Edit Client">
                                <a href="/blog/${e.slug}" class="link-dark">
                                    <i class="fa fa-fw fa-eye"></i>
                                </a>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary js-bs-tooltip-enabled" data-bs-toggle="tooltip" aria-label="Edit Client" data-bs-original-title="Edit Client">
                                <a href="/admin/posts/edit/${e.slug}" class="link-dark">
                                    <i class="fa fa-fw fa-pencil-alt"></i>
                                </a>
                            </button>
                        </div>
                    `}},{data:"id",name:"id",title:"ID",className:"text-center"},{data:"title",name:"title",title:"Title",className:"fw-semibold fs-sm",render:function(n,i,e,a){return`<span data-bs-toggle="tooltip" title="${e.title}">${A(e.title,20)}</span>`}},{data:"published",name:"published",title:"Published",render:function(n,i,e,a){let l=P(e.published);return`<span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill ${l.class}">${l.text}</span`}},{data:"featured",name:"featured",title:"Featured",className:"fs-sm",render:function(n,i,e,a){return`<div class="item item-tiny item-circle mx-auto mb-3
                        ${e.featured?"bg-success":"bg-danger"}"></div>`}},{data:"views",name:"views",title:'<i class="fa-solid fa-eye"></i>',className:"text-center"},{data:"likes",name:"likes",title:'<i class="fa-solid fa-thumbs-up"></i>',className:"text-center"},{data:"tags_count",name:"tags_count",title:"Tags",className:"text-center",searchable:!1},{data:"published_at",name:"published_at",title:"Published @",className:"text-center fs-sm",render:function(n,i,e,a){let l=e.published_at?moment(e.published_at).fromNow():"------",s=e.published_at?moment(e.published_at).format("Y-M-D hh:mm"):"------";return`<span title="${s}">${l}<br/>${s}</span>`}},{data:"created_at",name:"created_at",title:"Created @",className:"text-center fs-sm",render:function(n,i,e,a){let l=moment(e.created_at).fromNow(),s=moment(e.created_at).format("Y-M-D hh:mm");return`<span title="${s}">${l}<br/>${s}</span>`}},{data:"updated_at",name:"updated_at",title:"Updated @",className:"text-center fs-sm",render:function(n,i,e,a){let l=moment(e.updated_at).fromNow(),s=moment(e.updated_at).format("Y-M-D hh:mm");return`<span title="${s}">${l}<br/>${s}</span>`}},{data:"deleted_at",name:"deleted_at",title:"Active",className:"fs-sm",render:function(n,i,e,a){return`<div class="item item-tiny item-circle mx-auto mb-3 ${e.deleted_at?"bg-danger":"bg-success"}"></div>`}}]}),$("#tags").length&&g({first_time:!0,id:"#tags",method:"POST",url:"/api/tags",columns:[{data:"id",name:"id",title:"Actions",className:"text-center",render:function(n,i,e,a){return`
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary js-bs-tooltip-enabled" data-bs-toggle="tooltip" aria-label="Edit Client" data-bs-original-title="Edit Client">
                                <a href="/tags/${e.slug}" class="link-dark">
                                    <i class="fa fa-fw fa-eye"></i>
                                </a>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary js-bs-tooltip-enabled" data-bs-toggle="tooltip" aria-label="Edit Client" data-bs-original-title="Edit Client">
                                <a href="/admin/tags/edit/${e.slug}" class="link-dark">
                                    <i class="fa fa-fw fa-pencil-alt"></i>
                                </a>
                            </button>
                        </div>
                    `}},{data:"id",name:"id",title:"ID",className:"text-center"},{data:"name",name:"name",title:"Name",className:"fw-semibold fs-sm"},{data:"slug",name:"slug",title:"Slug",className:"fw-semibold fs-sm"},{data:"color",name:"color",title:"Color",className:"fw-semibold fs-sm",render:function(n,i,e,a){return`<div class="item item-tiny item-circle mx-auto mb-3"
                             style="background-color: ${e.color}"></div>`}},{data:"posts_count",name:"posts_count",title:"Posts",className:"fw-semibold fs-sm",searchable:!1},{data:"created_at",name:"created_at",title:"Created @",className:"text-center fs-sm",render:function(n,i,e,a){let l=moment(e.created_at).fromNow(),s=moment(e.created_at).format("Y-M-D hh:mm");return`<span title="${s}">${l}<br/>${s}</span>`}},{data:"deleted_at",name:"deleted_at",title:"Active",className:"fs-sm",render:function(n,i,e,a){return`<div class="item item-tiny item-circle mx-auto mb-3 ${e.deleted_at?"bg-danger":"bg-success"}"></div>`}}]}),$("#visitors").length){let n=g({first_time:!0,id:"#visitors",method:"POST",url:"/api/visitors",columns:[{data:"id",name:"id",title:"Actions",className:"text-center",render:function(i,e,a,l){return`
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm js-bs-tooltip-enabled display-visitor-details">
                                <i class="fa fs-3 fa-eye"></i>
                            </button>
                        </div>
                    `}},{data:"id",name:"id",title:"ID",className:"text-center"},{data:"ip",name:"ip",title:"IP",className:"text-center"},{data:"url",name:"url",title:"URL",className:"text-left"},{data:"ref_source",name:"ref_source",title:"Source",className:"text-left"},{data:"ref_medium",name:"ref_medium",title:"Medium",className:"text-left"},{data:"updated_at",name:"updated_at",title:"Updated @",className:"text-center fs-sm",render:function(i,e,a,l){let s=moment(a.updated_at).fromNow(),o=moment(a.updated_at).format("Y-M-D hh:mm");return`<span title="${o}">${s}<br/>${o}</span>`}},{data:"countryCode",name:"countryCode",title:"Country Code",className:"fw-semibold fs-sm"},{data:"currencyCode",name:"currencyCode",title:"Currency Code",className:"fw-semibold fs-sm"},{data:"countryName",name:"countryName",title:"Country Name",className:"fw-semibold fs-sm"},{data:"regionName",name:"regionName",title:"Region Name",className:"fw-semibold fs-sm"},{data:"cityName",name:"cityName",title:"City Name",className:"fw-semibold fs-sm"},{data:"latitude",name:"latitude",title:"Latitude",className:"fw-semibold fs-sm"},{data:"longitude",name:"longitude",title:"Longitude",className:"fw-semibold fs-sm"},{data:"regionCode",name:"regionCode",title:"Region Code",className:"fw-semibold fs-sm"},{data:"zipCode",name:"zipCode",title:"Zip Code",className:"fw-semibold fs-sm"},{data:"isoCode",name:"isoCode",title:"Iso Code",className:"fw-semibold fs-sm"},{data:"postalCode",name:"postalCode",title:"Postal Code",className:"fw-semibold fs-sm"},{data:"metroCode",name:"metroCode",title:"Metro Code",className:"fw-semibold fs-sm"},{data:"areaCode",name:"areaCode",title:"Area Code",className:"fw-semibold fs-sm"},{data:"timezone",name:"timezone",title:"Timezone",className:"fw-semibold fs-sm"},{data:"driver",name:"driver",title:"Driver",className:"fw-semibold fs-sm"}]});$("#visitors").on("click",".display-visitor-details",function(i){const e=$(this).closest("tr"),a=n.row(e).data();let l=moment(a.updated_at),s=`
            <div class="modal modal-visitor-details" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${a.countryName}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <form id="form-visitor" data-visitor-id="${a.id}">
                                    <div class="row">
                                        <div class="col-12 col-md-6">
                                            <div class="mb-3">
                                                <label class="form-label" for="country-name">Country</label>
                                                <input type="text" class="form-control" id="country-name" name="countryName"
                                                    value="${a.countryName}">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="country-code">Country Code</label>
                                                <input type="text" class="form-control" id="country-code" name="countryCode"
                                                    value="${a.countryCode}">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="region-name">Region</label>
                                                <input type="text" class="form-control" id="region-name" name="regionName"
                                                    value="${a.regionName}">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="city-name">City</label>
                                                <input type="text" class="form-control" id="city-name" name="cityName"
                                                    value="${a.cityName}">
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">IP : ${a.ip}</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">URL : ${a.url}</label>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">Source : ${a.ref_source}</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">Medium : ${a.ref_medium}</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">Created @ : ${l.format("Y-M-D hh:mm")} / ${l.fromNow()}</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">Zip Code : ${a.zipCode}</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">Latitude : ${a.latitude}</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">Logitude : ${a.longitude}</label>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleFormControlInput1" class="form-label">TimeZone : ${a.timezone}</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button type="submit" class="btn btn-outline-info w-100">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>`;$("#page-container").append(s);let o=$(".modal-visitor-details");$(".btn-close").add(".modal-visitor-details").on("click",function(r){r.target!=o[0]&&r.target!=$(".btn-close")[0]||(o.remove(),$(".modal-backdrop").remove())}),o.show(),$(document).off("submit","#form-visitor").on("submit","#form-visitor",function(r){if(r.preventDefault(),!confirm("Are you sure ?"))return;let d=$(this),u=d.serializeArray();$.ajax({type:"PUT",url:`/api/visitors/${d.data("visitor-id")}`,data:u,success:function(f){console.log(f),n.ajax.reload(null,!1),m({class:"alert-info",message:f.msg,icon:'<i class="fa-solid fa-check-circle"></i>'})},error:function(f,c,k){console.log(f,c,k),m({class:"alert-danger",message:f.responseJSON.msg,icon:'<i class="fa-solid fa-triangle-exclamation"></i>'})}})})})}if($("#messages").length){let n=g({first_time:!0,id:"#messages",method:"POST",url:"/api/messages",columns:[{data:"id",name:"id",title:"Actions",className:"text-center",render:function(i,e,a,l){return`
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm js-bs-tooltip-enabled display-email-details">
                                <i class="fa fs-3 fa-eye"></i>
                            </button>
                        </div>
                    `}},{data:"id",name:"id",title:"ID",className:"text-center"},{data:"name",name:"name",title:"Name",className:"text-center"},{data:"email",name:"email",title:"Email",className:"text-center"},{data:"body",name:"body",title:"Body",className:"text-center",render:function(i,e,a,l){return i.substring(0,30)+"..."}},{data:"created_at",name:"created_at",title:"Created @",className:"text-center fs-sm",render:function(i,e,a,l){let s=moment(a.created_at).fromNow(),o=moment(a.created_at).format("Y-M-D hh:mm");return`<span title="${o}">${s}<br/>${o}</span>`}}]});$("#messages").on("click",".display-email-details",function(i){const e=$(this).closest("tr"),a=n.row(e).data();let l=moment(a.created_at),s=`
            <div class="modal modal-email-details" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${a.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Sender : ${a.name}</label>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email : ${a.email}</label>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Message : <br/>${a.body}</label>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Created @ : ${l.format("Y-M-D hh:mm")} / ${l.fromNow()}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>`;$("#page-container").append(s);let o=$(".modal-email-details");$(".btn-close").add(".modal-email-details").on("click",function(r){r.target!=o[0]&&r.target!=$(".btn-close")[0]||(o.remove(),$(".modal-backdrop").remove())}),o.show()})}$("#subscriptions").length&&g({first_time:!0,id:"#subscriptions",method:"POST",url:"/api/subscriptions",columns:[{data:"id",name:"id",title:"Actions",className:"text-center",render:function(n,i,e,a){return`
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm js-bs-tooltip-enabled display-email-details">
                                <i class="fa fs-3 fa-eye"></i>
                            </button>
                        </div>
                    `}},{data:"id",name:"id",title:"ID",className:"text-center"},{data:"subscription_id",name:"subscription_id",title:"Subscription Id",className:"text-center"},{data:"email",name:"email",title:"Email",className:"text-center"},{data:"first_name",name:"first_name",title:"First Name",className:"text-center"},{data:"last_name",name:"last_name",title:"Last Name",className:"text-center"},{data:"subscribed_at",name:"subscribed_at",title:"Subscribed At",className:"text-center"},{data:"token_verification",name:"token_verification",title:"Token Verification",className:"text-center "},{data:"created_at",name:"created_at",title:"Created @",className:"text-center fs-sm",render:function(n,i,e,a){let l=moment(e.created_at).fromNow(),s=moment(e.created_at).format("Y-M-D hh:mm");return`<span title="${s}">${l}<br/>${s}</span>`}}]})}function g(t){let n=new DataTable(t.id,{pageLength:50,lengthMenu:[5,10,25,50,75,100,200],language:{fnInfoCallback:function(i,e,a,l,s,o){return`${e} <i class="fa-solid fa-arrow-right-long"></i> ${a} | ${s} (Total : ${l})`},paginate:{first:'<i class="fa fa-angle-double-left"></i>',previous:'<i class="fa fa-angle-left"></i>',next:'<i class="fa fa-angle-right"></i>',last:'<i class="fa fa-angle-double-right"></i>'},pagingType:"full_numbers",pageLength:5},searching:!0,responsive:!0,pagingType:"full_numbers",processing:!0,serverSide:!0,ajax:{type:t.method,url:t.url,data:function(i){i._token=$('meta[name="csrf-token"]').attr("content"),i.first_time=t.first_time}},columns:t.columns,initComplete:function(i,e){delete t.first_time,t.onComplete&&t.onComplete(i,e),this.find("thead").prepend('<tr id="search-row"></tr>'),this.api().columns().every(function(a){let l=this,s=l.dataSrc();if(t.columns[a].title.toLowerCase()==="actions"){$("#search-row").append("<th></th>");return}let r=`<th><input id="${s}" title="${s}" placeholder="${s.toUpperCase()}" type="search" style="min-width: 100px" class="form-control form-control-sm"></th>`;$("#search-row").append(r);let d=document.getElementById(s),u;d.addEventListener("input",f=>{clearTimeout(u),u=setTimeout(function(){l.search()!==this.value&&l.search(d.value).draw()},1e3)})})}});return $(".btn-refresh").on("click",function(i){n.ajax.reload(null,!1)}),n}function y(t,n){var i=new Date;i.setTime(i.getTime()+365*24*60*60*1e3);var e="expires="+i.toUTCString();document.cookie=t+"="+n+";"+e+";path=/"}function C(t){const i=`; ${document.cookie}`.split(`; ${t}=`);if(i.length===2)return i.pop().split(";").shift()}function E(t,n,i){t.hasClass(n.lightmode)?(t.addClass(n.darkmode).removeClass(n.lightmode),y(i.name,i.darkmodeValue)):(t.removeClass(n.darkmode).addClass(n.lightmode),y(i.name,i.lightmodeValue)),S()}function T(){let t=$(".spinner-global");t.length&&t.remove(),t=`<div class="spinner-global spinner-border" role="status"
                                style="width: 3rem; height: 3rem; position: fixed; bottom: 1rem; right: 1rem;
                                border-color: var(--tc-grey-dark) transparent var(--tc-grey-dark) var(--tc-grey-dark);" >
                            <span class="visually-hidden">Loading...</span>
                        </div>`,$(document.body).append(t)}function m(t,n=!0){if(n){let a=$(".spinner-border");a.length&&a.remove()}let i=$(".alert.alert-dismissible");i.length&&i.remove();let e=`
        <div data-notify="container" class="col-11 col-sm-4 alert ${t.class} alert-dismissible animated fadeIn" role="alert" data-notify-position="bottom-right"
            style="display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 1060; bottom: 20px; right: 20px; animation-iteration-count: 1;">
            <p class="mb-0">
                <span data-notify="icon">${t.icon}</span>
                <span data-notify="title"></span>
                <span data-notify="message">${t.message}</span>
            </p>
            <a class="p-2 m-1 text-dark" href="javascript:void(0)" aria-label="Close" data-notify="dismiss" style="position: absolute; right: 10px; top: 5px; z-index: 1035;">
                <i class="fa fa-times"></i>
            </a>
        </div>
    `;$(document.body).append(e),$(".alert.alert-dismissible").on("click",function(){$(this).remove()})}function D(t){t=t.replace(/^\s+|\s+$/g,""),t=t.toLowerCase();for(var n="\xE5\xE0\xE1\xE3\xE4\xE2\xE8\xE9\xEB\xEA\xEC\xED\xEF\xEE\xF2\xF3\xF6\xF4\xF9\xFA\xFC\xFB\xF1\xE7\xB7/_,:;",i="aaaaaaeeeeiiiioooouuuunc------",e=0,a=n.length;e<a;e++)t=t.replace(new RegExp(n.charAt(e),"g"),i.charAt(e));return t=t.replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-+/g,"").replace(/-+$/g,""),t}function M(){$(document).on("click",".toggle-dark-mode-admin",function(){E($("#page-container"),{darkmode:"page-header-dark dark-mode sidebar-dark",lightmode:"light-mode"},{name:"theme",darkmodeValue:"dark-mode",lightmodeValue:"light-mode"})})}let h=null;function F(){$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}}),$(document).on("ajaxSend",function(t,n,i){i.url.startsWith("/api")&&T()}),$(document).on("ajaxComplete",function(t,n,i){let e=$(".spinner-global");e.length&&e.remove()})}function x(t){let n='<div class="col-12"><div class="text-center p-5">No assets found</div></div>';t&&t.length&&(n="",t.forEach(function(l){let s=l.link.replace("--compressed","");n+=`<div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-5" style="height: 150px">
                            <div class="post-content-asset h-100 overflow-hidden" style="border-radius: 5px">
                                <a href="${s}" target="_blank">
                                    <img src="${l.link}" class="img-fluid w-100 h-100 lazyload"
                                         data-src="${s}"
                                         style="object-fit: fill; object-position: top center" alt="">
                                </a>
                            </div>
                            <a href="${l.link}" target="_blank">
                                <span class="fs-sm">${l.filename}</span></a>
                        </div>`}));let e=`
                    <div class="modal modal-post-assets ${C("theme")}" tabindex="-1">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Post Assets: ${t.length} images</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="container">
                                        <div class="row">${n}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-backdrop fade show"></div>`;$("body").append(e);let a=$(".modal-post-assets");$(".btn-close").add(".modal-post-assets").on("click",function(l){l.target!==a[0]&&l.target!==$(".btn-close")[0]||(a.remove(),$(".modal-backdrop").remove())}),a.show()}function A(t,n,i="..."){return t.length<n?t:t.substring(0,n)+i}function P(t){return{0:{value:0,class:"bg-gray text-gray-dark",text:"Draft"},1:{value:1,class:"bg-success-light text-success",text:"Published"}}[t]}function z(){$(document).on("focusout",".input-to-slugify",function(){let i=$(this).val(),e=D(i);$(".input-slug").val(e)});let t=document.getElementById("image");t&&(t.onchange=i=>{if(i.target.files.length>0){let e=URL.createObjectURL(i.target.files[0]),a=document.getElementById("image-preview");a.src=e}});let n=$(".btn-view-post-assets");n.length&&n.on("click",function(){!h||!h.length?$.ajax({type:"GET",url:`/api/posts/${$("#post-slug").val()}/assets`,success:function(i){h=i.post_assets,x(h)}}):x(h)})}function B(){let t=$(".btn-export");t.length&&t.on("click",function(){let i=null;$("#export-all-tables").prop("checked")||(i="",document.querySelectorAll("#tables .table-item").forEach(function(l){l.checked&&(i+=l.closest("tr").querySelector(".table-name").innerText+" ")}),i=i.trim());let e=$("#do-not-create-tables").prop("checked"),a=`
            ${i?"tables="+i:""}
            &
            ${e?"dontCreateTables=1":""}`;window.open("/admin/export-db?"+a)});let n=$("#export-all-tables");n.length&&n.on("click",function(){$(".table-item").prop("checked",this.checked)})}function U(){$(document).on("click",".file-operation",function(){let e=this.getAttribute("data-action"),a=this.getAttribute("data-name"),l=this.getAttribute("data-path").replace("\\","/"),s=`
            <div class="modal modal-operation-details" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title capitalize-first-letter">${e} file : ${a}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="file-operation-form" class="file-operation-form">
                                <input type="hidden" name="media_name" value="${a}" />
                                <div class="mb-3">
                                    <label for="src-path" class="form-label">Source :</label>
                                    <input type="text" class="form-control" id="src-path" name="src-path"
                                            readonly value="${l}">
                                </div>
                                <div class="mb-3">
                                    <label for="dest-path" class="form-label">Dest :</label>
                                    <div class="input-group mb-3">
                                      <span class="input-group-text" id="basic-addon3">storage/</span>
                                        <input type="text" class="form-control" id="dest-path" name="dest-path"
                                                aria-describedby="basic-addon3">
                                    </div>
                                </div>
                                <div class="mb-3 d-flex column-gap-2">
                                    <button type="submit" value="copy" class="btn tc-blue-dark-1-outline tc-blue-dark-1-bg-hover w-100 btn-submit"><i class="fa-solid fa-copy me-2"></i>Copy</button>
                                    <button type="submit" value="move" class="btn tc-red-light-outline tc-red-light-bg-hover w-100 btn-submit"><i class="fa-solid fa-file-export me-2"></i>Move</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>`;$("body").append(s);let o=$(".modal-operation-details");$(".btn-close").add(".modal-operation-details").on("click",function(r){r.target!=o[0]&&r.target!=$(".btn-close")[0]||(o.remove(),$(".modal-backdrop").remove())}),o.show()}),$(document).on("submit",".file-operation-form",function(e){if(e.preventDefault(),!confirm("Are you sure ?"))return;let a=$(this).serializeArray();a.push({name:"operation",value:e.originalEvent.submitter.value}),console.log(a),$.ajax({method:"POST",url:"/api/media/copy",data:a,success:function(l){console.log(l),m({class:"alert-info",message:l.msg,icon:'<i class="fa-solid fa-check-circle"></i>'}),p()},error:function(l,s,o){console.log(l,s,o),m({class:"alert-danger",message:l.responseJSON.msg,icon:'<i class="fa-solid fa-triangle-exclamation"></i>'})}})}),$(document).on("click",".delete-file",function(){if(!confirm("Are you sure ?"))return;let e=$(this),a=e.data("path"),l=e.data("name");$.ajax({type:"DELETE",url:`/api/path/${a}/name/${l}`,success:function(s){console.log(s),m({class:"alert-info",message:s.msg,icon:'<i class="fa-solid fa-check-circle"></i>'}),p()},error:function(s,o,r){console.log(s,o,r),m({class:"alert-danger",message:s.responseJSON.msg,icon:'<i class="fa-solid fa-triangle-exclamation"></i>'})}})}),$("#form-upload-files").on("submit",function(e){if(e.preventDefault(),!confirm("Are you sure ?"))return;let a=document.getElementById("form-upload-files"),l=new FormData(a),s=$("#current-path").val();l.append("path",s),$.ajax({method:"POST",url:"/api/media",data:l,contentType:!1,cache:!1,processData:!1,success:function(o){console.log(o),m({class:"alert-info",message:o.msg,icon:'<i class="fa-solid fa-check-circle"></i>'}),p()},error:function(o,r,d){console.log(o,r,d),m({class:"alert-danger",message:o.responseJSON.msg,icon:'<i class="fa-solid fa-triangle-exclamation"></i>'})}})});let n=$("#form-create-directories");n.length&&n.on("submit",function(e){if(e.preventDefault(),!confirm("Are you sure ?"))return;const a=new RegExp("/admin/media-manager/?","g");let l=window.location.pathname.replaceAll(a,"");l===""&&(l="storage");let s=$("#directories-names").val().trim();if(s===""){m({class:"alert-warning",message:"Empty inputs !!",icon:'<i class="fa-solid fa-triangle-exclamation"></i>'});return}s=s.split(";").map(function(o){return o.trim().replaceAll(/ +/gi," ")}),$.ajax({method:"POST",url:"/api/directories",data:{directoriesNames:s,currentPath:l},success:function(o){console.log(o),m({class:"alert-info",message:o.msg,icon:'<i class="fa-solid fa-check-circle"></i>'}),p()},error:function(o,r,d){console.log(o,r,d),m({class:"alert-danger",message:o.responseJSON.msg,icon:'<i class="fa-solid fa-triangle-exclamation"></i>'})}})});let i=$(".btn-empty-trash");i.length&&i.on("click",function(){!confirm("Are you sure ?")||$.ajax({type:"DELETE",url:"/api/directories/storage/trash",success:function(e){console.log(e),m({class:"alert-info",message:e.msg,icon:'<i class="fa-solid fa-check-circle"></i>'})},error:function(e,a,l){console.log(e,a,l),m({class:"alert-danger",message:e.responseJSON.msg,icon:'<i class="fa-solid fa-triangle-exclamation"></i>'})}})}),$(document).on("click",".media-link",function(e){e.preventDefault(),p(this.getAttribute("data-href"))}),$(document).on("mousedown",".media-name",function(e){this.setAttribute("contenteditable",!0)}),$(document).on("focusout",".media-name",function(e){this.setAttribute("contenteditable",!1)}),$(document).on("keydown",".media-name",function(e){if(e.key==="Enter"){if(!confirm("Are you sure ?"))return;this.setAttribute("contenteditable",!1);let a=this.innerText.trim(),l=this.getAttribute("data-media-name").trim();if(l===""||a===""){m({class:"alert-danger",message:"Names should not be empty",icon:'<i class="fa-solid fa-triangle-exclamation"></i>'}),this.innerText=l;return}let s={new_name:a,old_name:l,path:$("#current-path").val()};$.ajax({method:"POST",url:"/api/media/rename",data:s,success:function(o){console.log(o),m({class:"alert-info",message:o.msg,icon:'<i class="fa-solid fa-check-circle"></i>'}),p()},error:function(o,r,d){console.log(o,r,d),m({class:"alert-danger",message:o.responseJSON.msg,icon:'<i class="fa-solid fa-triangle-exclamation"></i>'})}})}})}function p(t=null){if(t)window.history.pushState(null,null,`/admin/media-manager/${t}`);else{const i=new RegExp("/admin/media-manager/?","g");t=window.location.pathname.replace(i,""),t.startsWith("/")&&(t=t.replace("/",""))}let n=`<div class="col-12 text-center p-5">
                    <div class="spinner-border" role="status"
                         style="width: 3rem; height: 3rem;
                         border-color: var(--tc-grey-dark) transparent var(--tc-grey-dark) var(--tc-grey-dark);" >
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`;$("#files").html(n),$("#directories").html(n),$.ajax({type:"GET",url:`/api/medias/${t}`,success:function(i){var s,o,r,d,u,f;let e=i.data;$("#current-path").val(e.current_path),$("#previous-path").attr("href",`/admin/media-manager/${e.previous_path||""}`).attr("data-href",e.previous_path),$("#breadcrumb").html(e.breadcrumb.breadcrumb);let a='<div class="col-12"><div class="text-center p-5">No directories found</div></div>';((s=e==null?void 0:e.content)==null?void 0:s.directories)&&((r=(o=e==null?void 0:e.content)==null?void 0:o.directories)==null?void 0:r.length)&&(a="",e.content.directories.forEach(function(c){a+=`<div class="col-6 col-sm-4 col-md-3 mb-4 media-item-wrapper">
                                        <div class="directory media-item mb-2">
                                            <a href="#" class="media-item-link media-link" data-href="${c.path}" class="media-item-link">
                                                <div class="directory-icon w-100 h-100"><i class="fa-solid fa-folder-open"></i></div>
                                            </a>
                                            <div class="directory-name w-100 h-100">
                                                <span title="${c.name}" class="media-name"
                                                    data-media-name="${c.name}">${c.name}</span>
                                            </div>
                                        </div>
                                        <div class="action-btns">
                                            <button type="submit" class="btn btn-outline-info w-100 file-operation" title="Copy File"
                                                    data-name="${c.name}" data-action="copy" data-path="${c.path}"><i class="fa-solid fa-file"></i></button>
                                            <button type="submit" class="btn btn-outline-danger w-100 delete-file" title="Delete File"
                                                    data-name="${c.name}" data-path="${c.path}"><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                    </div>`})),$("#directories").html(a);let l='<div class="col-12"><div class="text-center p-5">No files found</div></div>';((d=e==null?void 0:e.content)==null?void 0:d.files)&&((f=(u=e==null?void 0:e.content)==null?void 0:u.files)==null?void 0:f.length)&&(l="",e.content.files.forEach(function(c){l+=`<div class="col-6 col-sm-4 col-md-3 mb-4 media-item-wrapper">
                                    <div class="file media-item mb-2">
                                        <a href="/${c._pathname}" class="media-item-link" data-href="${c._pathname}" target="_blank" class="media-item-link">`,c._mimeType.includes("image")?l+=`<div class="file-image h-100">
                                        <img src="/${c._pathname}" class="img-fluid w-100 h-100" alt="${c._filename}"/>
                                    </div>`:l+='<div class="file-icon w-100 h-100"><i class="fa-solid fa-file"></i></div>',l+=`</a><div class="file-name w-100">
                                        <span title="${c._filename}" class="media-name"
                                            data-media-name="${c._filename}">${c._filename}</span>
                                    </div>`,l+=`</div><div class="action-btns">
                                        <button type="submit" class="btn btn-outline-info w-100 file-operation" title="Copy File"
                                                data-name="${c._filename}" data-action="copy" data-path="${c._pathname}"><i class="fa-solid fa-file"></i></button>
                                        <button type="submit" class="btn btn-outline-danger w-100 delete-file" title="Delete File"
                                                data-name="${c._filename}" data-path="${c._pathname}"><i class="fa-solid fa-trash"></i></button>
                                    </div></div>`})),$("#files").html(l)}})}export{F as a,L as b,S as c,I as d,z as e,j as f,B as g,U as h,M as i,p as j,O as k,E as t};
