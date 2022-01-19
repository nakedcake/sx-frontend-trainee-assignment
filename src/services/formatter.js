export const foramtDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
  
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
  
    return date.toLocaleDateString("en-US", options);
  };
  