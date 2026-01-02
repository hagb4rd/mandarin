// A shared global singleton instance of a TextViewer [function] can be required by actors via LogView()  ...
function LogView(elem) {
  TextViewer.singleton = TextViewer.singleton || TextViewer(elem)
  return TextViewer.singleton;
}

// returns a function which displays text in screen corner for DISPLAY_TIME ms (since last msg) 
// *elem which visibility will be triggered can be passed as parameter optionally
function TextViewer(elem) {
 var DISPLAY_TIME = 15000, p={}, defaultElem=document.createElement('div')
   defaultElem.style.zIndex = 9999
   defaultElem.style.position = 'fixed'
   defaultElem.style.top = 8
   defaultElem.style.left = 10
   defaultElem.style.fontSize ='18pt'
   defaultElem.style.fontFamily = 'FixedSys, console'
   defaultElem.style.color = 'red'
   p.elem=elem||defaultElem
   p.elem.style.visibility = 'hidden'
    p.elem.addEventListener('click', (e)=>{
      navigator.clipboard.writeText(p.elem.innerText);
      p.elem.animate([{
        scale:'1.4', 
        color:'yellow'
      },{
        scale:'1.0', 
        color:'red'
      }],{
        duration: 600,
        iterations: 1
      })
    })



  
   document.body.appendChild(p.elem)
   p.history=[]
   p.timeout = null
  
   p.off = () => { 
    p.elem.style.visibility = 'hidden'
   }
  p.on = (msg) => { 
    if(p.timeout)
      window.clearTimeout(p.timeout)
     p.history.unshift(msg)
     p.elem.innerHTML = msg;
     p.elem.style.visibility = 'visible'
     p.timeout=window.setTimeout(()=>p.off(), DISPLAY_TIME)
  } 
  var textViewer = function(msg) {
    p.on(msg)
  }
  textViewer.element = p.elem
  return textViewer;
}