const repoOwner = "wildfire029"; // ชื่อ GitHub ของคุณ
const repoName = "wildfire01"; // ชื่อ Repo ของคุณ
const folderPath = "/onepage"; // โฟลเดอร์ที่เก็บภาพ

const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(files => {
    const container = document.getElementById("newsContainer");
    files.forEach(file => {
      if (file.type === "file" && file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const imgUrl = file.download_url;
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("news-item");
        newsDiv.innerHTML = `<img src="${imgUrl}" alt="">`;
        container.appendChild(newsDiv);
      }
    });
  })
  .catch(err => console.error("โหลดภาพไม่ได้:", err));

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".news-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});

closeBtn.onclick = () => lightbox.style.display = "none";
lightbox.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};
