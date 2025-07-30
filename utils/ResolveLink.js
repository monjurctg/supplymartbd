export function ResolveLink(search) {
  let link = "";

  if (search.includes("aliexpress.com/item")) {
    let array = search.split(".html?");
    if (array.length > 0) {
      let array2 = array[0].split("/item/");
      if (array2.length > 1) {
        if (array2[1].includes(".html")) {
          link = `/product/${"aliexpress"}/${array2[1].split(".")[0]}`;
        } else {
          link = `/product/${"aliexpress"}/${array2[1]}`;
        }
      }
    }
  } else if (
    search.includes("taobao.com") ||
    search.includes("detail.tmall.com")
  ) {
    let array = search.split("id=");
    if (array.length === 2) {
      let array2 = array[1].split("&");
      if (array2.length > 0) {
        link = `/product/${"china"}/${array2[0]}`;
      }
    } else if (array.length > 2) {
      let array2 = array[2].split("&");
      if (
        search.includes("detail.tmall.com") ||
        search.includes("intl.taobao") ||
        search.includes("item.taobao")
      ) {
        array2 = array[1].split("&");
      }
      if (array2.length > 0) {
        link = `/product/${"china"}/${array2[0]}`;
      }
    }
  } else if (search.includes("amazon.com")) {
    let array = search.split("/dp/");
    if (array.length > 1) {
      let array2 = array[1].split("/");
      if (array2.length > 0) {
        link = `/product/${"amazon"}/${array2[0]}
          
          `;
      }
    }
  } else if (search.includes("amazon.ae")) {
    let array = search.split("/dp/");
    if (array.length > 1) {
      let array2 = array[1].split("/");
      if (array2.length > 0) {
        link = `/product/${"amazon.ae"}/${array2[0]}`;
      }
    }
  } else if (search.includes("amazon.in")) {
    let mSearch = search;
    if (search.includes("/gp/product/")) {
      mSearch = search.replace("/gp/product/", "/dp/");
    }
    let array = mSearch.split("/dp/");
    if (array.length > 1) {
      let array2 = array[1].split("/");
      if (array2.length > 0) {
        link = `/product/${"amazon.in"}/${array2[0]}`;
      }
    }
  } else if (search.includes("a.aliexpress.com")) {
    setLoading(true);
    let element = search.split("/_");
    if (element.length > 1) {
      let url = `https://a.aliexpress.com/_${element[1]}`;
      //   getRedirectUrl(url, "aliexpress", history, setLoading);
    }
  } else if (search.includes("m.tb.cn")) {
    setLoading(true);
    let element = search.split("https://m.tb.cn/");
    if (element.length > 1) {
      let array2 = element[1].split(" ");
      let keyword = array2.length > 0 ? array2[0] : null;
      let url = `https://m.tb.cn/${keyword}`;
      //   getRedirectUrl(url, "china", history, setLoading);
    }
  } else if (search.includes("detail.1688.com")) {
    let start = search.indexOf("offer/") + 6;
    let newSearch = search.substring(start);
    let end = newSearch.indexOf(".html");
    let productCode = newSearch.substring(0, end);
    if (productCode) {
      productCode = "abb-" + productCode;
      link = `/product/${"china"}/${productCode}`;
    }
  } else if (search.includes("m.1688.com")) {
    let productCode = "";
    if (search.includes("offerId=")) {
      let start = search.indexOf("offerId=") + 8;
      productCode = search.substring(start);
      productCode = productCode.replace(/\s/g, "");
    } else {
      let metaString =
        search.split("offer/").length > 1 ? search.split("offer/")[1] : "";
      productCode =
        metaString.split(".html").length > 1
          ? metaString.split(".html")[0]
          : "";
    }
    if (productCode) {
      productCode = "abb-" + productCode;
      link = `/product/${"china"}/${productCode}`;
    }
  } else {
    link = `/link-shopping?url=${search}`;
  }

  if (link) {
    let product_code = "";
    if (!link.includes("link-shopping")) {
      let pArray = link.split("/");
      product_code = pArray[pArray.length - 1];
    }

    return {
      link: link,
      product_code: product_code,
    };
  }

  return {};
}
